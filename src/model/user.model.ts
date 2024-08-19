import mongoose from "mongoose";
import { Models } from "../types";
export const UserModel = mongoose.model(
  Models.User,
  new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    {
      timestamps: true,
      // id: true,
    },
  ),
);
