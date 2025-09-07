import express from "express";
const app = express();
import databaseConnection from "./database/MongoDB.js";
import dotenv from "dotenv";

dotenv.config();
databaseConnection();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
