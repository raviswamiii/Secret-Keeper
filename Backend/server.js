import express from "express";
const app = express();
import dotenv from "dotenv";
import databaseConnection from "./database/MongoDB.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
databaseConnection();

app.use(cors({
  origin: process.env.FRONTEND_URL, // only your frontend
  credentials: true,                // allow cookies
}));
app.use(cookieParser());
app.use(express.json());

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
