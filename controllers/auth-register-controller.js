const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");

const regisAuth = asyncHandler(async (req,res,next) => {
    const {name , email , password } = req.body;
    if(!email || !name || !password){
        return next(new appError("All fields are required" , 400));
    }
    const foundEmail = await user.findOne({email:email});
    if(foundEmail){
        return next(new appError("Email already exist!" , 400));
    }
    const plainPass = password ;
    const hashedPass = await bcrypt.hash(plainPass , 10);
    const savedUser = await user.create({
        name : name,
        email:email,
        password : hashedPass
    });
    const payload = {
        name:name,
        id:savedUser.id,
        role:"attendee"
    }
    const secretKey = process.env.JWT_SECRET;
    const tocken = jwt.sign(payload,secretKey,{expiresIn:process.env.JWT_EXPIRES_IN});

res.status(201).json({
    status: "Success",
    message: "User created successfully",
    token: tocken, // 👈 Sending the token as requested
    data: {        // 👈 Returning the user data alongside it
        user: {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role || "attendee"
        }
    }
});

});

module.exports ={regisAuth}; 
// Step 1: Extract the fields from req.body.
// Step 2: Check if any field is empty (your broad validation strategy works perfectly here).
// Step 3: Query MongoDB to check if a user with that email already exists. If yes, return an error.
// Step 4: Hash the password using a library like bcrypt.
// Step 5: Create and save the new user document into your MongoDB collection.
// Step 6: Use the newly created user's database ID to generate your authentication token.
// Step 7: Respond to the client with the token and a success status code (201 Created).