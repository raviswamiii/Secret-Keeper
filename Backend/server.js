import express from "express";
const app = express();
import databaseConnection from "./database/MongoDB.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";

dotenv.config();
databaseConnection();

app.get("/", (req, res) => {
    res.send("Hellow my world.")
})

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
