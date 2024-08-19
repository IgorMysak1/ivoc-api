import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";
import { UserModel } from "../model";
import { getHashPassword } from "../utils";

export const signUp = () => async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { email, firstName, password } = req.body;

    const hashedPassword = await getHashPassword(password);

    const doc = new UserModel({
      email,
      firstName,
      password: hashedPassword,
    });

    const newUser = await doc.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      "secret_key",
      {
        expiresIn: "24h",
      },
    );

    res.json({
      token,
    });
  } catch (err) {
    console.log(`Error ${err}`);
    res.status(500).json({
      message: "Failed sign up",
    });
  }
};
export const logIn = () => async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "This user wasn't found",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(404).json({
        message: "This user wasn't found",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret_key",
      {
        expiresIn: "24h",
      },
    );

    res.json({
      token,
    });
  } catch (err) {
    console.log(`Err: ${err}`);
    res.status(500).json({
      message: "Failed to log in",
    });
  }
};
export const getMe = () => async (req: Request, res: Response) => {
  try {
    const id = req.body.userId;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User wasn't found",
      });
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
    });
  } catch (err) {
    console.log(`Err: ${err}`);
    res.status(500).json({
      message: "Failed to get user",
    });
  }
};
