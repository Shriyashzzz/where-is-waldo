import { Level } from "../../generated/prisma/enums";

export const getLevelFromIndex = (gameIndex: number) => {
  switch (gameIndex) {
    case 0:
      return Level.Easy;
    case 1:
      return Level.Medium;
    case 3:
      return Level.Hard;
    case 4:
      return Level.God;
  }
};
