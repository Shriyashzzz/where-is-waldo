import { Router } from "express";
import { coordinateRouter } from "./charachterCoordinate";
import { getGameStatus } from "../controllers/getGameStatus";

export const gameRouter = Router({ mergeParams: true });

gameRouter.use("/:index", coordinateRouter);
gameRouter.get("/:index/gamestatus", getGameStatus);
