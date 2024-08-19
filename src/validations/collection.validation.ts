import { body } from "express-validator";

export const collectionValidation = [
  body("repeatInterval", "Invalid repeat interval").isDate(),
  body("startAt", "Invalid start at").isDate(),
  body("endAt", "Invalid end at").isDate(),
  body("amountOfRepeatedWords", "Invalid amount of repeated words").isNumeric(),
  body("words", "Invalid words is").isArray().isMongoId(),
];
