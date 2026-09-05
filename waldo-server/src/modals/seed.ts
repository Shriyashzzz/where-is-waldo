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

  //fill up the chrachter coordinates
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
