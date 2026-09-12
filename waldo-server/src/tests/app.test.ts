import request from "supertest";
import { app } from "../routes/app";
import { prisma } from "../config/prisma";
import { charactersStore } from "../modals/characterStore";

describe("Coordinate verify for Waldo Easy ", () => {
  afterAll(async () => {
    await prisma.$disconnect();
    charactersStore.reset();
  });
  test(" waldo character exact correct coordinate", (done) => {
    request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 866, yCord: 925 })
      .expect(
        {
          isCorrectCharacter: true,
          clickedX: "866",
          clickedY: "925",
          foundCharacter: "Waldo",
          allFound: false,
        },
        done,
      );
  });

  test("waldo grace bounds + 10 for x axis", (done) => {
    request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 876, yCord: 925 })
      .expect(
        {
          isCorrectCharacter: true,
          clickedX: "876",
          clickedY: "925",
          foundCharacter: "Waldo",
          allFound: false,
        },
        done,
      );
  });
  test("waldo grace bounds - 10 for x axis", (done) => {
    request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 856, yCord: 925 })
      .expect(
        {
          isCorrectCharacter: true,
          clickedX: "856",
          clickedY: "925",
          foundCharacter: "Waldo",
          allFound: false,
        },
        done,
      );
  });
  test("waldo out of bounds x axis", (done) => {
    request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 892, yCord: 925 })
      .expect(
        {
          isCorrectCharacter: false,
          clickedX: "892",
          clickedY: "925",
          foundCharacter: "Waldo",
          allFound: false,
        },
        done,
      );
  });

  test("waldo grace bounds + 10 for y axis", (done) => {
    request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 866, yCord: 935 })
      .expect(
        {
          isCorrectCharacter: true,
          clickedX: "866",
          clickedY: "935",
          foundCharacter: "Waldo",
          allFound: false,
        },
        done,
      );
  });

  test("waldo grace bounds - 10 for y axis", (done) => {
    request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 866, yCord: 915 })
      .expect(
        {
          isCorrectCharacter: true,
          clickedX: "866",
          clickedY: "915",
          foundCharacter: "Waldo",
          allFound: false,
        },
        done,
      );
  });

  test("waldo out of bounds y axis", (done) => {
    request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 866, yCord: 951 })
      .expect(
        {
          isCorrectCharacter: false,
          clickedX: "866",
          clickedY: "951",
          foundCharacter: "Waldo",
          allFound: false,
        },
        done,
      );
  });
});

describe("Finding all charachters returns true for all found", () => {
  afterAll(async () => {
    await prisma.$disconnect();
    charactersStore.reset();
  });

  it("finding all charachters returns allFound true", async () => {
    const waldo0 = await request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 866, yCord: 915 });
    expect(waldo0.status).toBe(200);
    expect(waldo0.body.isCorrectCharacter).toBe(true);

    const dog0 = await request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Dog", xCord: 1167, yCord: 390 });
    expect(dog0.status).toBe(200);
    expect(dog0.body.isCorrectCharacter).toBe(true);

    const girlEasy = await request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "GirlWaldo", xCord: 885, yCord: 765 });
    expect(girlEasy.status).toBe(200);
    expect(girlEasy.body.isCorrectCharacter).toBe(true);

    const gandfalfEasy = await request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "GandalfWaldo", xCord: 1135, yCord: 974 });
    expect(gandfalfEasy.status).toBe(200);
    expect(gandfalfEasy.body.isCorrectCharacter).toBe(true);
    expect(gandfalfEasy.body.allFound).toBe(false);

    const yellowWaldo = await request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "YellowWaldo", xCord: 1203, yCord: 1200 });
    expect(yellowWaldo.status).toBe(200);
    expect(yellowWaldo.body.isCorrectCharacter).toBe(true);
    expect(yellowWaldo.body.allFound).toBe(true);
  });

  it("Rejects further processing if all character's have been found", async () => {
    const afterAllFoundReq = await request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "YellowWaldo", xCord: 1203, yCord: 1200 });
    expect(afterAllFoundReq.status).toBe(409);
    expect(afterAllFoundReq.body.allFound).toBe(true);
  });
});
