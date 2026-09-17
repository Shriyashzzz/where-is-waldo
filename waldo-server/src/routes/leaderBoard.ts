import { Router } from "express";
import { leaderBoardController } from "../controllers/leaderBoardController";
export const leaderBoardRouter = Router({ mergeParams: true });

leaderBoardRouter.get("/highScores", leaderBoardController.getGameLeaderBoard);
