import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
import { Level } from "../../generated/prisma/client";
import { Character } from "../../generated/prisma/client";

async function main(): Promise<void> {
  await prisma.game.deleteMany();
  await prisma.characterCoordinate.deleteMany();
  await prisma.user.deleteMany();
  await prisma.leaderBoard.deleteMany();

  //init the games
  const gameEasy = await prisma.game.create({
    data: {
      level: Level.Easy,
    },
  });
  const gameMedium = await prisma.game.create({
    data: {
      level: Level.Medium,
    },
  });
  const gameGodlike = await prisma.game.create({
    data: {
      level: Level.God,
    },
  });
  const gameHard = await prisma.game.create({
    data: {
      level: Level.Hard,
    },
  });

  //easy game mode seed characterss
  const waldoEasy = await prisma.characterCoordinate.create({
    data: {
      character: Character.Waldo,
      gameId: gameEasy.id,
      xCord: 866,
      yCord: 925,
    },
  });
  const dogEasy = await prisma.characterCoordinate.create({
    data: {
      character: Character.Dog,
      gameId: gameEasy.id,
      xCord: 1167,
      yCord: 390,
    },
  });
  const girlEasy = await prisma.characterCoordinate.create({
    data: {
      character: Character.GirlWaldo,
      gameId: gameEasy.id,
      xCord: 885,
      yCord: 756,
    },
  });

  const gandfalfEasy = await prisma.characterCoordinate.create({
    data: {
      character: Character.GandalfWaldo,
      gameId: gameEasy.id,
      xCord: 1135,
      yCord: 974,
    },
  });
  s;
  const yellowWaldo = await prisma.characterCoordinate.create({
    data: {
      character: Character.YellowWaldo,
      gameId: gameEasy.id,
      xCord: 1203,
      yCord: 1200,
    },
  });

  //medium mode seed characters

  const yellowMedium = await prisma.characterCoordinate.create({
    data: {
      character: Character.YellowWaldo,
      gameId: gameMedium.id,
      xCord: 1981,
      yCord: 1808,
    },
  });
  const girlMedium = await prisma.characterCoordinate.create({
    data: {
      character: Character.GirlWaldo,
      gameId: gameMedium.id,
      xCord: 2116,
      yCord: 1509,
    },
  });
  const dogMedium = await prisma.characterCoordinate.create({
    data: {
      character: Character.Dog,
      gameId: gameMedium.id,
      xCord: 3092,
      yCord: 1439,
    },
  });
  const gandalfMedium = await prisma.characterCoordinate.create({
    data: {
      character: Character.GandalfWaldo,
      gameId: gameMedium.id,
      xCord: 2491,
      yCord: 1513,
    },
  });
  const waldoMedium = await prisma.characterCoordinate.create({
    data: {
      character: Character.Waldo,
      gameId: gameMedium.id,
      xCord: 2531,
      yCord: 913,
    },
  });

  // hard mode seed characters

  const yellowHard = await prisma.characterCoordinate.create({
    data: {
      character: Character.YellowWaldo,
      gameId: gameHard.id,
      xCord: 1123,
      yCord: 1052,
    },
  });

  const girlHard = await prisma.characterCoordinate.create({
    data: {
      character: Character.GirlWaldo,
      gameId: gameHard.id,
      xCord: 1088,
      yCord: 573,
    },
  });
  const walodHard = await prisma.characterCoordinate.create({
    data: {
      character: Character.Waldo,
      gameId: gameHard.id,
      xCord: 1596,
      yCord: 613,
    },
  });

  const gandalfHard = await prisma.characterCoordinate.create({
    data: {
      character: Character.GandalfWaldo,
      gameId: gameHard.id,
      xCord: 2383,
      yCord: 1503,
    },
  });

  const dogHard = await prisma.characterCoordinate.create({
    data: {
      character: Character.Dog,
      gameId: gameHard.id,
      xCord: 1916,
      yCord: 1081,
    },
  });

  //god mode seed characters

  const yellowGod = await prisma.characterCoordinate.create({
    data: {
      character: Character.YellowWaldo,
      gameId: gameGodlike.id,
      xCord: 235,
      yCord: 1701,
    },
  });
  const gandalfGod = await prisma.characterCoordinate.create({
    data: {
      character: Character.GandalfWaldo,
      gameId: gameGodlike.id,
      xCord: 1609,
      yCord: 198,
    },
  });

  const dogGod = await prisma.characterCoordinate.create({
    data: {
      character: Character.Dog,
      gameId: gameGodlike.id,
      xCord: 2600,
      yCord: 729,
    },
  });

  const girlGod = await prisma.characterCoordinate.create({
    data: {
      character: Character.GirlWaldo,
      gameId: gameGodlike.id,
      xCord: 2928,
      yCord: 1601,
    },
  });

  const waldoGod = await prisma.characterCoordinate.create({
    data: {
      character: Character.Waldo,
      gameId: gameGodlike.id,
      xCord: 854,
      yCord: 1561,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
