import type { Character, Level } from "../../generated/prisma/enums";
import { prisma } from "../config/prisma";
import { LogError } from "../errors/LogError";
import { getLevelFromIndex } from "../util/getLevelFromIndex";

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
      const currLeaderBoard = await prisma.leaderBoard.findMany({
        where: {
          gameId: gameIndex,
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

      return { ok: false };
    }
  }

  async postLeaderBoardScore(
    gameIndex: number,
    userName: string,
    time: string,
  ): Promise<DBResponse<{ score: any }>> {
    try {
      const user = await prisma.user.create({ data: { name: userName } });
      const gameLevel = getLevelFromIndex(gameIndex);
      const currScore = await prisma.leaderBoard.create({
        data: {
          gameId: gameIndex,
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
