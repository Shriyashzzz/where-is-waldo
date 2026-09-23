import { gameRouter } from "./game.js";
import express from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import cors from "cors";
import config from "../config/config.js";
import session from "express-session";
import { charactersStore } from "../modals/characterStore.js";
import { createInitialAvatars } from "../modals/characterStore.js";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:
      config.ENV == "DEV"
        ? "http://localhost:5173"
        : "https://focused-harmony-production-fbd2.up.railway.app",
    credentials: true,
  }),
);
app.use(express.json());
app.set("trust proxy", true);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  }),
);
app.use((req, res, next) => {
  if (!req.session.avatars) req.session.avatars = createInitialAvatars();
  charactersStore.runInSession(req.session.avatars, next);
});
app.use("/api/games", gameRouter);
app.use("/", errorHandler);
