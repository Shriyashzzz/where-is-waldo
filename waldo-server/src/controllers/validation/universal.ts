import { validationResult, matchedData, param } from "express-validator";
import { charactersStore } from "../../modals/characterStore";
export const validateGameIndex = [
  param("index")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Invalid Game Index value")
    .custom((val) => {
      if (charactersStore.getLength() <= val) {
        throw new Error("index value not in range");
      } else {
        return val;
      }
    }),
];
