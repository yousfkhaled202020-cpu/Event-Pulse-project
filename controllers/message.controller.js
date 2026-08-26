const appError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const mesg = require("../models/message.model");

const sendMsg = asyncHandler(async (req,res,next) =>{
    const {eventId,content} = req.body;
    const sender = req.user.id;

    if(!sender || !eventId || !content){
    return next(new appError("Please fill all fields!", 400));
    }
    const newMessage = await mesg.create({
        event: eventId,
        sender: sender,
        content: content
    });
    req.io.to(eventId).emit("announcement", newMessage);
    res.status(201).json({
        status:"success",
        message:"message sent successfully",
        data:newMessage
    });
});

const getHistory = asyncHandler(async (req,res,next) =>{
    const eventId = req.params.eventId;
    if(!eventId){
        return next(new appError("please provide room id", 400));
    }
    const history = await mesg.find({event:eventId}).populate('sender','name -_id');
    res.status(200).json({
        status:"success",
        message:"History fetched successfully",
        data:history
    })
});



module.exports = {sendMsg,getHistory};