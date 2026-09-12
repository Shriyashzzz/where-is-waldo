import request from "supertest";
import { app } from "../routes/app";
import { prisma } from "../config/prisma";

describe("CharacterCoordinateRoute", () => {
  afterAll(() => {
    prisma.$disconnect();
  });
  test("easy waldo character exact correct coordinate", (done) => {
    request(app)
      .post("/api/games/0/click")
      .type("form")
      .send({ character: "Waldo", xCord: 886, yCord: 925 })
      .expect(
        {
          isCharachter: true,
          clickedX: 866,
          clickedY: 925,
          foundCharacter: "Waldo",
          allFound: false,
        },
        done,
      );
  });
});
