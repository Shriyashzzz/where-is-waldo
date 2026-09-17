import { Router } from "express";
import { coordinateRouter } from "./charachterCoordinate";
import { getGameStatus } from "../controllers/getGameStatus";
import { leaderBoardRouter } from "./leaderBoard";

export const gameRouter = Router({ mergeParams: true });

gameRouter.use("/:index", coordinateRouter);
gameRouter.get("/:index/gamestatus", getGameStatus); // sends an reponse regarding if game has ended or not
gameRouter.use("/:index/leaderBoard", leaderBoardRouter); // to get leaderboard for specific games
// gameRouter.get("/getAllLeaderBoard")  to get leaderboard for all games
