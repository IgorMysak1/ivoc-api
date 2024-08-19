import { body } from "express-validator";

export const signUpValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Invalid password").isLength({ min: 8, max: 16 }),
  body("firstName", "Invalid first name").isLength({ min: 2 }),
];

export const logInValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Invalid password").isLength({ min: 8, max: 16 }),
];
