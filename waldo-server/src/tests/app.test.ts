import { coordinateRouter } from "../routes/charachterCoordinate";
import request from "supertest";
import { app } from "../server";

describe("CharacterCoordinateRoute", () => {
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
