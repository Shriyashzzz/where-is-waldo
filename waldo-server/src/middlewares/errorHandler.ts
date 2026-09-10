import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { LogError } from "../errors/LogError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError && err.showError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(LogError(err)); // unexpected error — log it using logger
  res.status(500).json({ error: "Internal server error" });
}
