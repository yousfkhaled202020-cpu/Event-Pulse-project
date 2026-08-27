mongoose = require("mongoose");
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
const events = require("./data/eventsData");


const dataSeeder = async () => {
    let exitCode = 0;
    try{
        await connectDB();
        await message.deleteMany();
        await registration.deleteMany();
        await event.deleteMany();
        await category.deleteMany();
        await user.deleteMany();
        
        const insertedCategories = await category.insertMany(categories);
        console.log("Categories seeded...");

        for (const a of admins){
            const password = a.password ;
            const hashedPass = await bcrypt.hash(password,10);
            a.password = hashedPass;
        };
        const insertedAdmins = await user.insertMany(admins); 
        console.log("Admins seeded...");

        const defaultOrganizerId = insertedAdmins[0]._id;

        const eventsArray = Array.isArray(events) ? events : Object.values(events);
        
        const mappedEvents = eventsArray.map(ev => {
            let matchedCategory;
            
            if (ev.title.toLowerCase().includes("world cup")) {
                matchedCategory = insertedCategories.find(c => c.name === "Sports Events");
            } else if (ev.title.toLowerCase().includes("health")) {
                matchedCategory = insertedCategories.find(c => c.name === "Healthcare Events");
            }

            if (matchedCategory) {
                ev.category = matchedCategory._id;
            } else {
                console.warn(`Could not find a matching category for event: ${ev.title}`);
            }

            ev.organizer = defaultOrganizerId;
            
            return ev;
        });

        await event.insertMany(mappedEvents);
        console.log("Events linked and seeded...");
        
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