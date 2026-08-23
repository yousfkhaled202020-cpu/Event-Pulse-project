const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");

const requireRole = (...allowedUsers) => {
    return asyncHandler(async (req, res, next) => {
    if(!req.user || !req.user.role){
        return next(new appError("credentials missing , please login first!", 401));
    }
    if (!allowedUsers.includes(req.user.role)) {
        return next(new appError("You are not allowed!", 403));
    }
    next();
    });
};

module.exports = {requireRole};
