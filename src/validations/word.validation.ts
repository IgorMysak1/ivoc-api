import { body } from "express-validator";
import { WordsPriority, WordsTypes } from "../types";

export const wordValidation = [
  body("word", "Invalid word").isString().isLength({ min: 2 }),
  body("translation", "Invalid translation").isString().isLength({ min: 2 }),
  body("wordsPriority", "Invalid word priority")
    .notEmpty()
    .isIn(Object.values(WordsPriority))
    .withMessage("Word priority does contain invalid value"),
  body("type", "Invalid word type")
    .notEmpty()
    .isIn(Object.values(WordsTypes))
    .withMessage("Word type does contain invalid value"),
];
