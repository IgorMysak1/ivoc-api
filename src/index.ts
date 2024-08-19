import mongoose from "mongoose";
import { makeApp } from "./app";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGO_DB_URL ?? "";
const PORT = process.env.PORT ?? "";

(async () => {
  try {
    const app = makeApp();

    await mongoose.connect(URL);

    app.listen(PORT, () => console.log(`Listening ${PORT} port`));
  } catch (err) {
    console.log(`Error: ${err}`);
  }
})();
