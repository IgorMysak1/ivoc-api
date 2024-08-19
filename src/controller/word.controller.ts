import { Request, Response } from "express";
import { WordModel } from "../model";
import { validationResult } from "express-validator";
import { WordsPriority } from "../types";

export const getAllWords = () => async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { wordsPriority } = req.query;
    // TODO: Make pretty
    const filter =
      wordsPriority === WordsPriority.ALL
        ? { userId }
        : { wordsPriority: wordsPriority, userId };

    const words = await WordModel.find(filter);

    res.json(words);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({
      message: "Fail to return all words",
    });
  }
};
export const createWord = () => async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { word, translation, wordsPriority, type, userId } = req.body;

    const doc = new WordModel({
      userId,
      word,
      translation,
      wordsPriority,
      type,
      numberOfSends: 0,
    });

    const newWord = await doc.save();

    res.json(newWord);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({
      message: "Word was not created",
    });
  }
};
export const updateWord = () => async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { userId } = req.body;

    const { id } = req.params;
    const updatedWord = await WordModel.findByIdAndUpdate(
      {
        _id: id,
        userId,
      },
      //   TODO: Make pretty
      {
        ...req.body,
      },
    );

    if (!updatedWord) {
      return res.status(404).json({ message: "Word was not found" });
    }

    res.json({
      status: true,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({
      message: "Fail to update word",
    });
  }
};
export const deleteWord = () => async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const deleteWord = await WordModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deleteWord) {
      return res.status(404).json({ message: "Word was not found" });
    }
    res.json({
      status: true,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({
      message: "Word was not deleted",
    });
  }
};
