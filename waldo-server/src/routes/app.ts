import config from "../config/config.js";
import { gameRouter } from "./game.js";
import express from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import cors from "cors";
import session from "express-session";
import { charactersStore } from "../modals/characterStore.js";
import { createInitialAvatars } from "../modals/characterStore.js";
import redisClient from "../config/redis.js";
import { RedisStore } from "connect-redis";

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
const isProd = config.ENV !== "DEV";
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    },
  }),
);
// TEMP DEBUG
app.use((req, res, next) => {
  console.log("---");
  console.log("Method:", req.method, "Path:", req.originalUrl);
  console.log("Raw Cookie header:", req.headers.cookie);
  console.log("Resolved sessionID:", req.sessionID);
  console.log("Had avatars already?", !!req.session.avatars);
  next();
});

app.use((req, res, next) => {
  if (!req.session.avatars) req.session.avatars = createInitialAvatars();
  charactersStore.runInSession(req.session.avatars, next);
});
app.use("/api/games", gameRouter);
app.use("/", errorHandler);
