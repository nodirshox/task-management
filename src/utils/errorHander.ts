import { Request, Response, NextFunction } from "express";
import ApiError from "./ApiError";
import { ValidationError } from "express-validation";

export default (
  err: Error & { details: any },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let currentError: ApiError;
  console.error("Error", err);
  if (err.name === "ValidationError" || err instanceof ValidationError) {
    currentError = new ApiError(400, "VALIDATION_ERROR");
    currentError.setErrors(err.details);
  } else if (err instanceof ApiError) {
    currentError = err;
  } else {
    currentError = new ApiError(500);
  }
  currentError.send(res);
};
