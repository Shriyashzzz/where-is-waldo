import { prisma } from "../config/prisma.js";
import request from "supertest";
import { app } from "../routes/app.js";
import { Level } from "../../generated/prisma/client.js";
import { charactersStore } from "../modals/characterStore.js";

describe("leaderBoard route test", () => {
  let agent;
  let userAlice;
  let userBob;
  let userCharlie;
  let gameEasy;
  let gameMedium;
  let gameHard;
  let gameGodlike;

  beforeAll(async () => {
    agent = request.agent(app);

    // find all characters for game 0 via real requests, so this session's
    // avatars state actually reflects allFound === true before postScore runs
    await agent
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 866, yCord: 925 });
    await agent
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Dog", xCord: 1167, yCord: 390 });
    await agent
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "GirlWaldo", xCord: 885, yCord: 765 });
    await agent
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "GandalfWaldo", xCord: 1342, yCord: 978 });
    await agent
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "YellowWaldo", xCord: 1203, yCord: 1200 });

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
    await prisma.leaderBoard.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    charactersStore.reset();
  });

  it("Get Easy Game LeaderBoards", (done) => {
    agent
      .get(`/api/games/0/leaderBoard/highScores`)
      .expect(200)
      .expect((res) =>
        expect(res.body).toEqual({
          leaderBoard: expect.arrayContaining([
            expect.objectContaining({ level: "Easy", time: "00:45.23" }),
            expect.objectContaining({ level: "Easy", time: "00:52.10" }),
          ]),
        }),
      )
      .end(done);
  });

  it("Post a new Game Score", async () => {
    const res = await agent
      .post(`/api/games/0/leaderBoard/postScore`)
      .send({ userName: "TempUser", time: "0:0:0:1:234" });
    expect(res.status).toBe(200);

    const newRes = await agent.get(`/api/games/0/leaderBoard/highScores`);
    expect(newRes.status).toBe(200);
    expect(newRes.body).toEqual({
      leaderBoard: expect.arrayContaining([
        expect.objectContaining({ level: "Easy", time: "00:45.23" }),
        expect.objectContaining({ level: "Easy", time: "00:52.10" }),
        expect.objectContaining({ level: "Easy", time: "0:0:0:1:234" }),
      ]),
    });
  });
});
