import { prisma } from "../config/prisma";
import request from "supertest";
import { app } from "../routes/app";
import config from "../config/config";
import { Level } from "../../generated/prisma/client";

describe("leaderBoard route test", () => {
  // test this with local database
  let userAlice: { id: number };
  let userBob: { id: number };
  let userCharlie: { id: number };
  let gameEasy: { id: number };
  let gameMedium: { id: number };
  let gameHard: { id: number };
  let gameGodlike: { id: number };

  beforeAll(async () => {
    // fetch existing games (assumes seed script has already run)
    gameEasy = await prisma.game.findUniqueOrThrow({
      where: { level: Level.Easy },
    });
    gameMedium = await prisma.game.findUniqueOrThrow({
      where: { level: Level.Medium },
    });
    gameHard = await prisma.game.findUniqueOrThrow({
      where: { level: Level.Hard },
    });
    gameGodlike = await prisma.game.findUniqueOrThrow({
      where: { level: Level.God },
    });

    // init test users
    userAlice = await prisma.user.create({ data: { name: "Alice" } });
    userBob = await prisma.user.create({ data: { name: "Bob" } });
    userCharlie = await prisma.user.create({ data: { name: "Charlie" } });

    // init leaderboard test data
    await prisma.leaderBoard.createMany({
      data: [
        {
          userId: userAlice.id,
          gameId: gameEasy.id,
          level: Level.Easy,
          time: "00:45.23",
        },
        {
          userId: userBob.id,
          gameId: gameEasy.id,
          level: Level.Easy,
          time: "00:52.10",
        },
        {
          userId: userCharlie.id,
          gameId: gameMedium.id,
          level: Level.Medium,
          time: "01:12.88",
        },
        {
          userId: userAlice.id,
          gameId: gameHard.id,
          level: Level.Hard,
          time: "02:03.45",
        },
        {
          userId: userBob.id,
          gameId: gameGodlike.id,
          level: Level.God,
          time: "03:30.00",
        },
      ],
    });
  });

  afterAll(async () => {
    // cleanup: delete leaderboard test data
    await prisma.leaderBoard.deleteMany({
      where: {
        userId: { in: [userAlice.id, userBob.id, userCharlie.id] },
      },
    });
    await prisma.user.deleteMany({
      where: {
        id: { in: [userAlice.id, userBob.id, userCharlie.id] },
      },
    });
    await prisma.$disconnect();
  });

  it("Get all LeaderBoards", async () => {
    const res = await request(app)
      .post(`/api/games/${gameEasy.id}/leaderBoard/highScores`)
      .send();

    expect(res.status).toBe(200);
  });
});
