import { Level } from "../../generated/prisma/enums.js";

export const getLevelFromIndex = (gameIndex: number) => {
  switch (gameIndex) {
    case 0:
      return Level.Easy;
    case 1:
      return Level.Medium;
    case 2:
      return Level.Hard;
    case 3:
      return Level.God;
  }
};
