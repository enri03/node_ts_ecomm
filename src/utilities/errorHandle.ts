import { Request, Response } from "express";
import { IProductInput } from "../interfaces/IProductInputs";
export const isValidInputs = (res: Response, inputObject: IProductInput) => {
  const { name, description, price, stockQuantity, category }: IProductInput =
    inputObject;
  let errors: string[] = [];

  if (!name || typeof name !== "string") {
    errors.push(
      "Invalid or missing 'name'. Name is required and must be a string."
    );
  }
  if (price === undefined || typeof price !== "number" || price < 0) {
    errors.push(
      "Invalid or missing 'price'. Price is required and must be a positive number."
    );
  }
  if (
    stockQuantity !== undefined &&
    (typeof stockQuantity !== "number" || stockQuantity < 0)
  ) {
    errors.push(
      "Invalid 'stockQuantity'. stockQuantity must be a positive number."
    );
  }

  // If there are any errors, return and call handleError with the errors joined into a single string and return false.
  if (errors.length > 0) {
    handleError(res, errors.join(" "), 400);
    return false;
  } else {
    return true;
  }
};
export const handleError = (
  res: Response,
  error: string | object,
  code: number = 400
) => {
  res.status(code).json({ error });
};
