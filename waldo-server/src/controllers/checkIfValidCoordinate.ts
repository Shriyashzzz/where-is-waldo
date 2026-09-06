import type { Request, Response, NextFunction } from "express";
import { validationResult, matchedData, body, param } from "express-validator";
import queries from "../modals/query";
import { getLevelFromIndex } from "../util/getLevelFromIndex";
import { Character } from "../../generated/prisma/enums";
import { isWithInBounds } from "../util/isWithinBounds";

const validationChain = [
  param("gameIndex").notEmpty().isNumeric(),
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
      return next(errors);
    }
    const { gameIndex, character, xCord, yCord }: Props = matchedData(req);
    const currLevel = getLevelFromIndex(gameIndex);
    // get the specific character's original coordinate
    const { ok, X_Cord, Y_Cord } = await queries.getTrueCoordinate(
      currLevel!,
      character,
    );
    if (!X_Cord || !Y_Cord) return res.sendStatus(400); // undefined clicked coordinate
    if (!ok) return next(new Error("Server Error"));
    const clickedCoordinate = { x_cord: xCord, y_cord: yCord };
    const originalCoordinate = { x_cord: X_Cord, y_cord: Y_Cord };
    const isWithinBounds = isWithInBounds(
      originalCoordinate,
      clickedCoordinate,
    );

    if (isWithinBounds)
      //update server character's state depending on the answer
      return res.status(200).json({
        isCharachter: true, // send true if correct click
        clickedX: X_Cord,
        clickedY: Y_Cord,
        foundCharacter: character,
        allFound: false, // create a function to check if all found
      });

    return res.status(200).json({
      isCharacter: false,
      clickedX: X_Cord,
      clickedY: Y_Cord,
      clickedCharacter: character,
      allFound: false,
    });
  },
];

export { checkIfValidCoordinate };
