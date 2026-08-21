const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const connectDB = require("../config/connectDB");
const user = require("../models/user.model");
const event = require("../models/event.model");
const message = require("../models/message.model")
const category = require("../models/category.model");
const registration = require("../models/registration.model");
const categories = require("./data/categoriesData");
const admins = require("./data/adminUserData");


const dataSeeder = async () => {
    let exitCode = 0;
    try{
        await connectDB();
        await message.deleteMany();
        await registration.deleteMany();
        await event.deleteMany();
        await category.deleteMany();
        await user.deleteMany();
        
        await category.insertMany(categories);
        for (const a of admins){
            const password = a.password ;
            const hashedPass = await bcrypt.hash(password,10);
            a.password = hashedPass;
        };
        await user.insertMany(admins); 
        console.log("Seeding is completed successfully!")
    }
    catch(err){
        console.error("Seeding failed" , err.message);
        exitCode = 1;
    }
    finally{
        await mongoose.disconnect();
        process.exit(exitCode);
    }
}
dataSeeder();