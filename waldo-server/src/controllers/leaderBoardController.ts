import type { NextFunction, Response, Request } from "express";
import {
  validationResult,
  type Result,
  matchedData,
  body,
} from "express-validator";
import { AppError } from "../errors/AppError.js";
import queries from "../modals/query.js";
import { formatError } from "../util/formatError.js";
import { validateGameIndex } from "./validation/universal.js";
import { charactersStore } from "../modals/characterStore.js";

const validateLeaderBoardStats = [
  body("userName")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 20 })
    .withMessage("UserName has to be of string datatype,between 1 & 20"),
  body("time")
    .trim()
    .notEmpty()
    .isString()
    .custom((val) => {
      const timeRegex = /^[0-9]+(:[0-9]+)+$/;
      if (!timeRegex.test(val)) throw new Error("Invalid time value");
      const total = val
        .split(":")
        .reduce((sum: number, part: string) => sum + Number(part), 0);
      if (total === 0) throw new Error("Time cannot be zero");
      return true;
    }),
];

export const leaderBoardController = {
  getGameLeaderBoard: [
    ...validateGameIndex,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors: Result = validationResult(req);
        if (!errors.isEmpty()) {
          return next(
            new AppError("Invalid URI value Value", 400, true, false),
          );
        }
        const { index } = matchedData(req);
        const numGameIndex: number = parseInt(index);
        const dbResponse = await queries.getLeaderBoard(numGameIndex);
        if (dbResponse.ok && dbResponse.data) {
          return res
            .status(200)
            .json({ leaderBoard: dbResponse.data.leaderBoard });
        } else {
          return next(new AppError("Internal Server Error", 503, false, true));
        }
      } catch (err) {
        next(err);
      }
    },
  ],
  postStat: [
    ...validateGameIndex,
    ...validateLeaderBoardStats,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors: Result = validationResult(req);
        if (!errors.isEmpty()) {
          const formattedError = formatError(errors);
          return next(new AppError(formattedError, 400, false, true));
        }
        const { userName, time, index } = matchedData(req);
        const numGameIndex = parseInt(index);

        if (!charactersStore.isAllFound(numGameIndex))
          return next(
            new AppError(
              "All Charachter's have not been found",
              400,
              false,
              true,
            ),
          );
        const dbResponse = await queries.postLeaderBoardScore(
          userName,
          numGameIndex,
          time,
        );
        if (!dbResponse.ok)
          return next(new AppError("Internal Server Error", 500, false, true));
        if (!dbResponse.data) {
          return next(
            new AppError(
              "Unable to submit your score to the leaderboard",
              500,
              false,
              true,
            ),
          );
        }
        return res.status(200).json({ score: dbResponse.data?.score });
      } catch (err) {
        next(err);
      }
    },
  ],
};
