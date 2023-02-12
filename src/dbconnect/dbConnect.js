import mongoose from "mongoose";
import { USER, PASSWORD, CLUSTER } from "../config/config.js";

export async function dbConnect() {
  mongoose.set(`strictQuery`, false);
  const DBName = "FinanceDB";
  return mongoose.connect(
    `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}/${DBName}?retryWrites=true&w=majority`
  );
}
