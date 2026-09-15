import type { NextFunction, Response, Request } from "express";

import { validationResult, matchedData, param, body } from "express-validator";
import { AppError } from "../errors/AppError.js";
import { charactersStore } from "../modals/characterStore.js";
import queries from "../modals/query.js";
const validateGameIndex = [
  param("index")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Invalid Game Index value")
    .custom((val) => {
      if (charactersStore.getLength() <= val) {
        throw new Error("index value not in range");
      } else {
        return val;
      }
    }),
];

export const leaderBoardController = {
  getAllStats: [
    ...validateGameIndex,
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return next(new AppError("Invalid URI value Value", 400, true, false));
      const { index } = matchedData(req);
      const response = await queries.getLeaderBoard(index);
      if (response.ok) {
        return res.status(400).json({ leaderBoard: response.leaderBoard });
      } else {
        return next(new AppError("Internal Server Error", 503, false, true));
      }
    },
  ],
};
