import mongoose, { Schema } from "mongoose";
import { Models } from "../types";

export const WordModel = mongoose.model(
  Models.Word,
  new mongoose.Schema(
    {
      word: { type: String, required: true, unique: true },
      translation: { type: String, required: true },
      type: { type: String, required: true },
      wordsPriority: { type: String, required: true },
      numberOfSends: { type: Number, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Models.User,
        required: true,
      },
    },
    {
      id: true,
    },
  ),
);
