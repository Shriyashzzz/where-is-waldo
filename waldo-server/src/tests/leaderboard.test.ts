import { prisma } from "../config/prisma";
import request from "supertest";
import { app } from "../routes/app.js";
import { Level } from "../../generated/prisma/client";
import { charactersStore } from "../modals/characterStore.js";

describe("leaderBoard route test", () => {
  let userAlice: { id: number };
  let userBob: { id: number };
  let userCharlie: { id: number };
  let gameEasy: { id: number };
  let gameMedium: { id: number };
  let gameHard: { id: number };
  let gameGodlike: { id: number };

  beforeAll(async () => {
    charactersStore.setAllFound(0);
    // fetch existing games
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
    await prisma.leaderBoard.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    charactersStore.reset();
  });

  it("Get Easy Game LeaderBoards", (done) => {
    request(app)
      .get(`/api/games/0/leaderBoard/highScores`)
      .expect(200)
      .expect((res) =>
        expect(res.body).toEqual({
          leaderBoard: expect.arrayContaining([
            expect.objectContaining({
              level: "Easy",
              time: "00:45.23",
            }),
            expect.objectContaining({
              level: "Easy",
              time: "00:52.10",
            }),
          ]),
        }),
      )
      .end(done);
  });

  it("Post a new Game Score", async () => {
    const res = await request(app)
      .post(`/api/games/0/leaderBoard/postScore`)
      .send({ userName: "TempUser", time: "0:0:0:1:234" });
    expect(res.status).toBe(200);

    const newRes = await request(app).get(
      `/api/games/0/leaderBoard/highScores`,
    );
    expect(newRes.status).toBe(200);
    expect(newRes.body).toEqual({
      leaderBoard: expect.arrayContaining([
        expect.objectContaining({
          level: "Easy",
          time: "00:45.23",
        }),
        expect.objectContaining({
          level: "Easy",
          time: "00:52.10",
        }),
        expect.objectContaining({
          level: "Easy",
          time: "0:0:0:1:234",
        }),
      ]),
    });
  });
});
