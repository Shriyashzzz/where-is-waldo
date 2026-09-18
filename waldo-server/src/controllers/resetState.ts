import type { NextFunction, Request, Response } from "express";
import { validateGameIndex } from "./validation/universal";
import { matchedData, validationResult } from "express-validator";
import { AppError } from "../errors/AppError";
import { charactersStore } from "../modals/characterStore";
export const resetState = [
  ...validateGameIndex,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new AppError("Invalid Game Index value", 400, false, true));
    const { gameIndex } = matchedData(req);
    const isReset = charactersStore.reset();
    if (!isReset)
      return next(
        new AppError("Unable to reset charachter Store", 500, false, false),
      );
    return res.status(200);
  },
];
