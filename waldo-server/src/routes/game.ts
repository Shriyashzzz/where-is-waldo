import { Router } from "express";
import { coordinateRouter } from "./charachterCoordinate.js";
import { getGameStatus } from "../controllers/getGameStatus.js";
import { leaderBoardRouter } from "./leaderBoard.js";
import { resetState } from "../controllers/resetState.js";

export const gameRouter = Router({ mergeParams: true });

gameRouter.use("/:index", coordinateRouter);
gameRouter.get("/:index/gamestatus", getGameStatus); // sends an reponse regarding if game has ended or not
gameRouter.use("/:index/leaderBoard", leaderBoardRouter); // to get leaderboard for specific games]
gameRouter.delete("/charachters/reset", resetState);
// gameRouter.get("/getAllLeaderBoard")  to get leaderboard for all games
