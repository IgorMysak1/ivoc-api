import { Router } from "express";

import { signUp, logIn, getMe } from "../controller";
import { signUpValidation, logInValidation } from "../validations";
import { checkAuth } from "../utils";

export const getAuthRouter = () => {
  const authRouter: Router = Router();
  authRouter.post("/sign-up", signUpValidation, signUp());
  authRouter.post("/log-in", logInValidation, logIn());
  authRouter.get("/me", checkAuth, getMe());

  return authRouter;
};
