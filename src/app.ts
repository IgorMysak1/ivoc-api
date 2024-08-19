import express from "express";
import cors from "cors";
import { getWordRouter, getAuthRouter } from "./routes";

export const makeApp = () => {
  const app = express();

  // Add cors for web
  app.use(
    cors({
      origin: ["http://localhost:5173"],
    }),
  );

  // Get req in json format
  app.use(express.json());

  // Endpoints
  app.use("/api/auth", getAuthRouter());
  app.use("/api/words", getWordRouter());

  return app;
};
