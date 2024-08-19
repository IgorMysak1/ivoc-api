import { Router } from "express";

import { createWord, getAllWords, deleteWord, updateWord } from "../controller";

import { checkAuth } from "../utils";
import { wordValidation } from "../validations";

export const getWordRouter = () => {
  const wordRouter: Router = Router();
  wordRouter.post("/", checkAuth, wordValidation, createWord());
  wordRouter.get("/all", checkAuth, wordValidation, getAllWords());
  wordRouter.delete("/:id", checkAuth, wordValidation, deleteWord());
  wordRouter.patch("/:id", checkAuth, wordValidation, updateWord());

  return wordRouter;
};
