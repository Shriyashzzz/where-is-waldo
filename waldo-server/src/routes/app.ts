import { gameRouter } from "./game";
import express from "express";
import { errorHandler } from "../middlewares/errorHandler";

export const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/api/games", gameRouter);
app.use("/", errorHandler);
