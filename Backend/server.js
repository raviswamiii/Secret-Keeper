import express from "express";
const app = express();
import databaseConnection from "./database/MongoDB.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();
databaseConnection();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hellow my world.");
});

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
