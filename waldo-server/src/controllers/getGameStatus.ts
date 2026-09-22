import type { Request, Response, NextFunction } from "express";
import { charactersStore } from "../modals/characterStore.js";
import { validationResult, param, body, matchedData } from "express-validator";
import { AppError } from "../errors/AppError.js";

const validationChain = [
  param("index")
    .trim()
    .notEmpty()
    .custom((indx) => {
      if (charactersStore.getLength() < indx || indx < 0) {
        throw new Error("invalid gameIndex value");
      }
      return true;
    }),
];

export const getGameStatus = [
  ...validationChain,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid user DataType", 400, false, true));
    }
    const { index } = matchedData(req);
    return res
      .status(200)
      .json({ finished: charactersStore.isAllFound(index) });
  },
];
