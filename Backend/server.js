import express from "express";
const app = express();
import databaseConnection from "./config/mongodb.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
databaseConnection();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use("/user", userRouter);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.")
})