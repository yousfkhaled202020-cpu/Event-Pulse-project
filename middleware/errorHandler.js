const appError = require("../utils/AppError")

const validationErrorHandler = (error) => {
    const errors = Object.values(error.errors).map(val => val.message);
    const messages = errors.join(', ');
    const errMessage = `Invalid input : ${messages}`;
    return new appError(errMessage, 400);

}
const castErrorHandler = (error) => {
    const errMessage = `Invalid ${error.path} which is : ${error.value}`;
    return new appError(errMessage, 400);
}
const duplicateKeyHandler = (error) => {
    const keys = Object.keys(error.keyValue);
    const values = Object.values(error.keyValue);
    const errMessage = `Duplicate key : ${keys}: ${values}`;
    return new appError(errMessage , 409);



}
const errorHandler = (error, req, res, next) => {
    let err = {...error};
    err.message = error.message;
    err.name = error.name;
    err.code = error.code;
    if (err.name === "ValidationError") err = validationErrorHandler(err);
    if (err.name === "CastError") err = castErrorHandler(err);
    if (err.code === 11000) err = duplicateKeyHandler(err);
    const statusCode = err.statusCode || 500 ;
    const message = err.message || "Internal Server error";
    const status = err.status || "error";

    res.status(statusCode).json({
    status: status,
    message: message ,
    data: null 
})
}
module.exports = errorHandler;