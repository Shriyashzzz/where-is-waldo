import { Router } from "express";
import { checkIfValidCoordinate } from "../controllers/checkIfValidCoordinate";

const coordinateRouter = Router({ mergeParams: true });

coordinateRouter.post("/verify/:gameIndex", checkIfValidCoordinate);
