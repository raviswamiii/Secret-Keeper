import express from "express";
const app = express();
import databaseConnection from "./config/mongodb.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";

dotenv.config();
databaseConnection();

cors({
    origin: process.env.FRONTEN_URL,
    credentials: true
})

app.use("/user", userRouter)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.")
})