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
    const token = jwt.sign(payload,secretKey,{expiresIn:process.env.JWT_EXPIRES_IN});

    res.status(201).json({
        status:"Success",
        message:"user created successfully",
        data:token
    })
});

module.exports ={regisAuth}; 
