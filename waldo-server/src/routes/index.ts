import { Router } from "express";
import { gameRouter } from "./game";

export const indexRouter = Router();

indexRouter.use("/games", gameRouter);
