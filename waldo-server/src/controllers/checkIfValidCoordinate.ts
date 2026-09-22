import type { Request, Response, NextFunction } from "express";
import { validationResult, matchedData, body, param } from "express-validator";
import queries from "../modals/query.js";
import { getLevelFromIndex } from "../util/getLevelFromIndex.js";
import { Character } from "../../generated/prisma/enums.js";
import { isWithInBounds } from "../util/isWithinBounds.js";
import { charactersStore } from "../modals/characterStore.js";
import { AppError } from "../errors/AppError.js";

const validationChain = [
  param("index")
    .trim()
    .notEmpty()
    .custom((indx) => {
      if (charactersStore.getLength() < indx || indx < 0) {
        throw new Error("invalid gameIndex value");
      }
      return true;
    }),
  body("character")
    .trim()
    .notEmpty()
    .custom((val) => {
      switch (val) {
        case "YellowWaldo":
          return Character.YellowWaldo;
        case "Dog":
          return Character.Dog;
        case "GirlWaldo":
          return Character.GirlWaldo;
        case "Waldo":
          return Character.Waldo;
        case "GandalfWaldo":
          return Character.GandalfWaldo;
      }
      throw new Error("Invalid Character Name");
    }),
  body("xCord")
    .trim()
    .notEmpty()
    .isFloat()
    .withMessage("Invalid x coordinate datatype"),
  body("yCord")
    .trim()
    .notEmpty()
    .isFloat()
    .withMessage("Invalid y coordinate datatype"),
];

interface Props {
  index: string;
  character: Character;
  xCord: number;
  yCord: number;
}

const checkIfValidCoordinate = [
  ...validationChain,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return next(new AppError("Ivalid user DataType", 400, false, true));
    }
    const { index, character, xCord, yCord }: Props = matchedData(req);
    let gameIndex = parseInt(index);
    const currLevel = getLevelFromIndex(gameIndex);
    // get the specific character's original coordinate
    if (charactersStore.isAllFound(gameIndex))
      return res.status(409).json({
        message: "All the characters have already been found",
        allFound: charactersStore.isAllFound(gameIndex),
      });
    const { ok, data } = await queries.getTrueCoordinate(currLevel!, character);
    if (!data || !data.X_Cord || !data.Y_Cord) return res.sendStatus(400); // undefined clicked coordinate
    if (!ok)
      return next(
        new AppError(
          "Unable process the coordinates with the database",
          500,
          false,
          false,
        ),
      );
    const clickedCoordinate = { x_cord: xCord, y_cord: yCord };
    const originalCoordinate = { x_cord: data.X_Cord, y_cord: data.Y_Cord };
    const isWithinBounds = isWithInBounds(
      originalCoordinate,
      clickedCoordinate,
    );
    if (isWithinBounds) {
      try {
        charactersStore.found(gameIndex, character);
      } catch (e) {
        next(e);
      }
    }
    return res.status(200).json({
      isCorrectCharacter: isWithinBounds,
      clickedX: xCord,
      clickedY: yCord,
      foundCharacter: character,
      allFound: charactersStore.isAllFound(gameIndex),
    });
  },
];

export { checkIfValidCoordinate };
