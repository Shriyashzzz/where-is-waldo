import express from "express";
import config from "./config/config";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use("/game/:leaderboard");

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`server is live on: https://localhost:${config.port}`);
});
