const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB.js");
const app = express();
const PORT = process.env.PORT || 5000 ;

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