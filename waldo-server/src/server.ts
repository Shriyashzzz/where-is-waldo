import express from "express";
import config from "./config/config";
const app = express();

app.listen(config.port, () => {
  console.log(`server is live on: https://localhost:${config.port}`);
});
