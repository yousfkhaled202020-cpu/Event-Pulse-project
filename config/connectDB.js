const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const dataSeeder = require("../seeder/seed");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        await dataSeeder();
        console.log("Database is connected")
    }catch (error){
        console.log("Database connection failed" , error.message);
        process.exit(1);
    }
}

module.exports = connectDB;