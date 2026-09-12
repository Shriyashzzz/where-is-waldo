import request from "supertest";
import { app } from "../routes/app";
import { prisma } from "../config/prisma";
import { charactersStore } from "../modals/characterStore";

describe("CharacterCoordinateRoute", () => {
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
});
