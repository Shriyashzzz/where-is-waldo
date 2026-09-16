import type { Result } from "express-validator";

type ErrorResponse = {
  path: string;
  msg: string;
};

export function formatError(errorObj: Result) {
  const errorArray: ErrorResponse[] = errorObj.array();
  //check if errorAraray is not empty later
  let formattedError = "";
  for (const currError of errorArray) {
    formattedError += `Invalid value: ${currError.path} \n`;
  }
  return formattedError;
}

//careful empty error is not validated or conditioned against
