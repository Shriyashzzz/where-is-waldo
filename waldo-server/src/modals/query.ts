import type { Character, Level } from "../../generated/prisma/enums.js";
import { prisma } from "../config/prisma.js";
import { LogError } from "../errors/LogError.js";
import { getLevelFromIndex } from "../util/getLevelFromIndex.js";

export interface DBResponse<T> {
  ok: boolean;
  data?: T;
}

class Queries {
  async getTrueCoordinate(
    level: Level,
    character: Character,
  ): Promise<
    DBResponse<{ X_Cord: number | undefined; Y_Cord: number | undefined }>
  > {
    try {
      const currGame = await prisma.game.findUnique({
        where: { level: level },
      });
      const charachterInfo = await prisma.characterCoordinate.findUnique({
        where: {
          gameId_character: {
            character: character,
            gameId: currGame!.id,
          },
        },
      });

      return {
        ok: true,
        data: {
          X_Cord: charachterInfo?.xCord,
          Y_Cord: charachterInfo?.yCord,
        },
      };
    } catch (e) {
      LogError(e);
      return { ok: false };
    }
  }

  async getLeaderBoard(
    gameIndex: number,
  ): Promise<DBResponse<{ leaderBoard: any }>> {
    //define leaderboard type later
    try {
      const gameLevel = getLevelFromIndex(gameIndex);

      if (!gameLevel) {
        return { ok: false };
      }
      const currGame = await prisma.game.findUniqueOrThrow({
        where: { level: gameLevel },
      });
      const currLeaderBoard = await prisma.leaderBoard.findMany({
        where: {
          gameId: currGame.id,
        },
        include: {
          user: true,
        },
        omit: {
          userId: true,
          gameId: true,
        },
        orderBy: [
          {
            time: "asc",
          },
        ],
      });
      return { ok: true, data: { leaderBoard: currLeaderBoard } };
    } catch (e) {
      LogError(e);
      console.log(e);
      return { ok: false };
    }
  }

  async postLeaderBoardScore(
    userName: string,
    gameIndex: number,
    time: string,
  ): Promise<DBResponse<{ score: any }>> {
    try {
      const user = await prisma.user.create({ data: { name: userName } });

      const gameLevel = getLevelFromIndex(gameIndex);

      if (!gameLevel) {
        return { ok: false };
      }
      const currGame = await prisma.game.findUniqueOrThrow({
        where: { level: gameLevel },
      });
      const currScore = await prisma.leaderBoard.create({
        data: {
          gameId: currGame.id,
          userId: user.id,
          level: gameLevel!,
          time: time,
        },
      });

      return { ok: true, data: { score: currScore } };
    } catch (e) {
      LogError(e);
      return { ok: false };
    }
  }
}

const queries = new Queries();

export default queries;
