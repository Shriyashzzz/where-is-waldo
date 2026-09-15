import { Router } from "express";

export const leaderBoardRouter = Router({ mergeParams: true });

leaderBoardRouter.get("highScores");
