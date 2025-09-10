import express from "express";
const app = express();
import dotenv from "dotenv";
import databaseConnection from "./database/MongoDB.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
databaseConnection();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
