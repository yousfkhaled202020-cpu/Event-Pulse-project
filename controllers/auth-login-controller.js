const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");
const loginAuth = asyncHandler(async (req,res,next) =>{
    const {email , password} = req.body
    if(!email || !password){
        return next(new appError("Please provide email and password", 400));
    }
    const foundUser = await user.findOne({email}).select('+password');
    if(!foundUser){
        return next(new appError("Invalid Email or Password", 401));
    }
    const matchedPass = await bcrypt.compare(password , foundUser.password);
    if(!matchedPass){
        return next(new appError("Invalid Email or Password", 401));
    }
    const name = foundUser.name;
    const payload = {
            name:name,
            id:foundUser.id,
            role:foundUser.role || "attendee"
        }
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload,secretKey,{expiresIn:process.env.JWT_EXPIRES_IN});
    
        res.status(200).json({
            status:"Success",
            token,
        })


});
module.exports = {loginAuth};