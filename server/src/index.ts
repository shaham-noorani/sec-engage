import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import router from "./router";
import connectToDatabase from "./db/db";
import authRouter, { anyUserAuthMiddleware } from "./auth/auth";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.use("/api", anyUserAuthMiddleware, router);

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
