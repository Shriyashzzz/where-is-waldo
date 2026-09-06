import type { Character, Level } from "../../generated/prisma/enums";
import { prisma } from "../config/prisma";

class Queries {
  async getTrueCoordinate(level: Level, character: Character) {
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
        X_Cord: charachterInfo?.xCord,
        Y_Cord: charachterInfo?.yCord,
      };
    } catch (e) {
      return { ok: false };
    }
  }
}

const queries = new Queries();

export default queries;
