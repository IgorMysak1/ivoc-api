import mongoose from "mongoose";

import { Models } from "../types";

export const CollectionModel = mongoose.model(
  Models.Collection,
  new mongoose.Schema({
    repeatInterval: { type: Date, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    amountOfRepeatedWords: { type: Number, required: true },
    words: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Models.Word,
      required: true,
    },
  }),
);
