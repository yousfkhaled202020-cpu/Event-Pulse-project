const eventRouter = require("../routes/event.routes.js");
const loginRouter = require("../routes/login.route.js");
const messageRouter = require("../routes/message.routes.js");
const regisRouter = require("../routes/registration.routes.js");
const regisAuthRouter = require("../routes/auth-register-route.js");

const setupRoutes = (app) =>{
    app.use("/api/messages" , messageRouter);
    app.use("/api/events" , eventRouter);
    app.use("/api/registrations" , regisRouter);
    app.use("/api/auth/login" , loginRouter);
    app.use("/api/auth/register" , regisAuthRouter);
};


module.exports = setupRoutes;