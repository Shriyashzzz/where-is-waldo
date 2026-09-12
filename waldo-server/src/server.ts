import express from "express";
import config from "./config/config";
import { errorHandler } from "./middlewares/errorHandler";
import { indexRouter } from "./routes";

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use("/api", indexRouter);
app.use(errorHandler);
