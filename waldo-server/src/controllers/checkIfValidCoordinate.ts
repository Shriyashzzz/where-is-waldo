import type { Request, Response, NextFunction } from "express";
import { validationResult, matchedData, body, param } from "express-validator";
import queries from "../modals/query";
import { getLevelFromIndex } from "../util/getLevelFromIndex";
import { Character } from "../../generated/prisma/enums";
import { isWithInBounds } from "../util/isWithinBounds";
import { charactersStore } from "../modals/characterStore";
import { AppError } from "../errors/AppError";

const validationChain = [
  param("gameIndex")
    .notEmpty()
    .isNumeric()
    .custom((indx) => {
      if (charactersStore.getLength() < indx || indx < 0) {
        throw new Error("invalid gameIndex value");
      }
      return true;
    }),
  body("character")
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
          Character.Waldo;
        case "GandalfWaldo":
          Character.GandalfWaldo;
      }
      throw new Error("Invalid Character Name");
    }),
  body("xCord")
    .notEmpty()
    .isFloat()
    .withMessage("Invalid x coordinate datatype"),
  body("yCord")
    .notEmpty()
    .isFloat()
    .withMessage("Invalid y coordinate datatype"),
];

interface Props {
  gameIndex: number;
  character: Character;
  xCord: number;
  yCord: number;
}

const checkIfValidCoordinate = [
  ...validationChain,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Ivalid user DataType", 400, false, true));
    }
    const { gameIndex, character, xCord, yCord }: Props = matchedData(req);
    const currLevel = getLevelFromIndex(gameIndex);
    // get the specific character's original coordinate
    const { ok, X_Cord, Y_Cord } = await queries.getTrueCoordinate(
      currLevel!,
      character,
    );
    if (!X_Cord || !Y_Cord) return res.sendStatus(400); // undefined clicked coordinate
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
    const originalCoordinate = { x_cord: X_Cord, y_cord: Y_Cord };
    const isWithinBounds = isWithInBounds(
      originalCoordinate,
      clickedCoordinate,
    );

    if (isWithinBounds) {
      try {
        charactersStore.found(gameIndex, character);
        return res.status(200).json({
          isCharachter: true, // send true if correct click
          clickedX: X_Cord,
          clickedY: Y_Cord,
          foundCharacter: character,
          allFound: charactersStore.isAllFound(gameIndex),
        });
      } catch (e) {
        next(e);
      }
    }
    return res.status(200).json({
      isCharacter: false,
      clickedX: X_Cord,
      clickedY: Y_Cord,
      clickedCharacter: character,
      allFound: charactersStore.isAllFound(gameIndex),
    });
  },
];

export { checkIfValidCoordinate };
