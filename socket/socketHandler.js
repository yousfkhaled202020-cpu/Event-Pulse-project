const {sendMsg,getHistory} = require("../controllers/message.controller");
const socketHandler = (io) =>{
    io.on("connection",async(socket) =>{
        console.log("User connected" , socket.id);
        socket.on("join-event",(eventId) =>{
            if (!eventId) return;    
            socket.join(eventId);
            console.log(`User ${socket.id} joined room: ${eventId}`);
        });
        socket.on("send-message", async (sender, eventId, content) => {
            const newMessage = await sendMsg(sender, eventId, content);
            io.to(eventId).emit("new-message", newMessage);
        });
        socket.on("get-history", async (eventId) => {
            const history = await getHistory(eventId);
            socket.emit("message-history", history);
        });
        socket.on("leave-event", (eventId) => {
            if (!eventId) return;
            socket.leave(eventId);
            console.log(`User ${socket.id} left room: ${eventId}`);
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
})};


module.exports = socketHandler;