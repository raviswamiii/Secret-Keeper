import mongoose, { mongo } from "mongoose";

export const databaseConnection = () => {
    mongoose.connection.on("connection", () => {
        console.log("Connected to database.");
    })

    mongoose.connect(process.env.MONGODB_URI);
}