const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");
const event = require("../models/event.model");
const regis = require("../models/registration.model");


const bookEvent = asyncHandler(async(req,res,next) => {
    const eventId = req.params.id;
    const userId = req.user.id;
    const { age } = req.body;
    const eventDetails = await event.findById(eventId);
    if(!eventDetails){
        return next(new appError("Event not found", 404));
    }
    const reserved = await regis.findOne({attendee:userId , event:eventId});
    if(reserved){
        return next(new appError("You have booked this event once", 400));
    }
    const currentRegistrations = await regis.countDocuments({ event: eventId });
    if (currentRegistrations >= eventDetails.capacity) {
        return next(new appError("Sorry, Event is fully booked", 400));
    }

    const newReserve = await regis.create({attendee:userId , event:eventId , age:age});
    const populatedReserve = await regis.findById(newReserve._id).populate("event");

    res.status(201).json({
        status:"success",
        message:"Reservation Created successfully",
        data:populatedReserve
    })
    

});
const showMyReserve = asyncHandler(async(req,res,next) => {
    const userId = req.user.id;

    const registrations = await regis.find({ attendee: userId }).populate('event');

    res.status(200).json({
        status:"success",
        message:"Reservations fetched successfully",
        data:registrations
    });
});
const showAllReserve = asyncHandler(async (req,res,next) => {
    const allreserves = await regis.find();
        res.status(200).json({
        status:"success",
        message:"Reservations fetched successfully",
        data:allreserves
    });
});
const cancelMyReserve = asyncHandler(async(req,res,next) =>{
    const userId = req.user.id;
    const registrationId = req.params.id;
    
    const registration = await regis.findById(registrationId);
    if (!registration) {
        return next (new appError("Registration not found"  ,404));
    }
    if (registration.attendee.toString() !== userId) {
    return next (new appError("You can only cancel your own registration" , 403));  
    }

    const canceledreserve = await registration.deleteOne();
    
    res.status(200).json({
        status:"success",
        message: 'Registration cancelled successfully' ,
        data:null
    });
});
module.exports = {bookEvent,showMyReserve,cancelMyReserve,showAllReserve};