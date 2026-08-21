const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const expressMongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./config/connectDB.js");
const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(express.json());
app.use(morgan('dev'));
app.use(expressMongoSanitize());
app.get("/" , (req,res) => {
    res.send("hello world");
});
const start = async() => {
    await connectDB() ;
    app.listen(PORT , () => {
        console.log("server running");
    })
}
start();