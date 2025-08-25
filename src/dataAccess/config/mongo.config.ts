import mongoose from "mongoose";
import "dotenv/config";

export default async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            dbName: process.env.DB_NAME,
            connectTimeoutMS: 30,
        });
    }
    catch (error) {
        console.error(error.message);
    }
};
