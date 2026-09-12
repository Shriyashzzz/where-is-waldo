import { Router } from "express";
import { coordinateRouter } from "./charachterCoordinate";

export const gameRouter = Router({ mergeParams: true });

gameRouter.use("/:index", coordinateRouter);
