const dotenv = require("dotenv").config();
const http = require("http");
const express = require("express");
const {Server} = require("socket.io");


const connectDB = require("./config/connectDB.js");
const setupMiddleware = require("./config/middleware.js");
const setupRoutes = require("./config/routes.js");  
const socketHandler = require("./socket/socketHandler.js");


const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});
const PORT = process.env.PORT || 5000 ;

setupMiddleware(app);
app.use((req,res,next) =>{
    req.io = io;
    next();
});
socketHandler(io);
setupRoutes(app);

//404 error handeler
app.use((req,res,next) =>{
res.status(404).json({status:'fail' , message: 'Page Not Found'});
});

app.get("/api/health",(req,res) =>{
    res.json({
        status:"ok",
        connection: io.engine.clientsCount
    })
});

//function: run the app
const start = async() => {
    await connectDB() ;
server.listen(PORT,() =>{
    console.log("chat Server is running");
});
}
start();


module.exports = app;