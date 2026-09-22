import { Router } from "express";
import { checkIfValidCoordinate } from "../controllers/checkIfValidCoordinate.js";

export const coordinateRouter = Router({ mergeParams: true });

coordinateRouter.post("/click", checkIfValidCoordinate);
