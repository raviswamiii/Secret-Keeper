import express from "express";
const app = express();
import dotenv from "dotenv";
import databaseConnection from "./database/MongoDB.js";

dotenv.config();
databaseConnection();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
