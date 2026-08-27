const dotenv = require("dotenv").config();
const http = require("http");
const express = require("express");
const {Server} = require("socket.io");


const connectDB = require("./config/connectDB.js");
const setupMiddleware = require("./config/middleware.js");
const setupRoutes = require("./config/routes.js");  
const errorHandler = require("./middleware/errorHandler.js");
const socketHandler = require("./socket/socketHandler.js");


const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});
const PORT = process.env.PORT || 5000 ;
const SERVER_START_TIME = Date.now();


setupMiddleware(app);
app.use((req,res,next) =>{
    req.io = io;
    next();
});
socketHandler(io);
setupRoutes(app);


app.get("/health", (req, res) => {
    const uptime = Math.floor((Date.now() - SERVER_START_TIME) / 1000);
    
    res.status(200).json({
        status: "ok",
        environment: process.env.NODE_ENV || "development",
        uptime: `${uptime}s`,
        database: "connected", // Update based on actual DB connection state
        timestamp: new Date().toISOString()
    });
});

//404 error handeler
app.use((req,res,next) =>{
res.status(404).json({status:'fail' , message: 'Page Not Found'});
});

app.use(errorHandler);

//function: run the app
if (process.env.NODE_ENV !== "production") {
    connectDB().then(() => {
        server.listen(PORT, () => {
            console.log("Chat Server is running locally");
        });
    }).catch(err => console.log("Database connection error:", err));
} else {
    // On Vercel, connect to the DB immediately when the file loads
    connectDB().catch(err => console.log("Production Database connection error:", err));
}

module.exports = server;
