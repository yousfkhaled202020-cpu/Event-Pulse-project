const morgan = require("morgan");
const express = require("express");
const expressMongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("../middleware/errorHandler");

const setupMiddleware = (app) => {
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(expressMongoSanitize());

    //central error handler
    app.use(errorHandler);

}
module.exports = setupMiddleware;