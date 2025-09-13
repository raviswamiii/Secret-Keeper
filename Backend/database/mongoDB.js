import mongoose from "mongoose";

const databaseConnection = () => {
    mongoose.connection.on("connected", () => {
        console.log("Connected to database.")
    })

    mongoose.connect(process.env.MOGONDB_URI)
}

export default databaseConnection;