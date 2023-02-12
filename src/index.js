import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { dbConnect } from "./dbconnect/dbConnect.js";
import { usersRouter } from "./routers/usersRouter.js";

// Initial Server Setup

const app = express();
const port = 5500;
const server = http.createServer(app);

// DB Connection

dbConnect()
  .then((mongoose) => {
    console.log("Connection successful:");
    console.log(mongoose.connection.db.databaseName);
    console.log(`Open in browser: http://localhost:${port}`);
    server.listen(port);
  })
  .catch((error) => {
    console.log("Failed to connect to FinanceDB...");
    server.emit(error);
  });

// Middlewares Setup

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("Finance DB - BackEnd - Miguel Garcia");
});

// Routers

app.use("/users", usersRouter);
