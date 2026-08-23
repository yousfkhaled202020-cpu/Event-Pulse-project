const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");

const requireAuth = asyncHandler(async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(new appError("Unauthorized user , please register first !", 401));
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return next(new appError("Access Denied !" , 401));
    }
    const secretKey = process.env.JWT_SECRET;
    try{
        const decoded = jwt.verify(token ,secretKey);
        req.user = decoded;
        next();
    }catch(error){
        return next(new appError(" Unverified user !" , 401));

    }
});
module.exports = {requireAuth};