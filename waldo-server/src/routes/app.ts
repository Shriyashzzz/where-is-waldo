import { gameRouter } from "./game.js";
import express from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import cors from "cors";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://focused-harmony-production-fbd2.up.railway.app",
    credentials: true,
  }),
);
app.use(express.json());
app.set("trust proxy", true);
app.use("/api/games", gameRouter);
app.use("/", errorHandler);
