import { Router } from "express";
import { checkIfValidCoordinate } from "../controllers/checkIfValidCoordinate";

export const coordinateRouter = Router({ mergeParams: true });

coordinateRouter.post("/click", checkIfValidCoordinate);
