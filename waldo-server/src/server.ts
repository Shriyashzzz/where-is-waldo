import express from "express";
import config from "./config/config";
import type { Errback, NextFunction, Request, Response } from "express";

const app = express();

app.use("/game/:leaderboard");

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  console.log(err);
});

app.listen(config.port, () => {
  console.log(`server is live on: https://localhost:${config.port}`);
});
