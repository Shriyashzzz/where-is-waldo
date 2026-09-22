import { gameRouter } from "./game.js";
import express from "express";
import { errorHandler } from "../middlewares/errorHandler.js";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", true);
app.use("/api/games", gameRouter);
app.use("/", errorHandler);
