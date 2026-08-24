const event = require("../models/event.model");
const category = require("../models/category.model");
const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");

const listAllEvents = asyncHandler(async (req,res,next) =>{
    const { category, city, startDate, endDate ,search ,sortBy,order } = req.query;
    const filter = {};
    if(req.query.category){
        filter.category = req.query.category;
    }
    if(req.query.city){
        filter['address.city'] = req.query.city;
    }
    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }
    const page = parseInt(req.query.page) || 1 ;
    const limit = parseInt(req.query.limit) || 10 ;
    const skip = (page - 1) * limit ;
    const totalDocs = await event.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);
    const allowedSortFields = ['date', 'registrations'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'date';
    const sortDirection = order === 'desc' ? -1 : 1;
    const sort = { [sortField]: sortDirection };
    if (search) {
        filter.$or = [
            { title:       { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }
    const allEvents = await event.find(filter).skip(skip).limit(limit).populate('category');
    res.status(200).json({
        status:"success",
        total:totalDocs ,
        page: page,
        limit:limit,
        totalPages:totalPages,
        data: allEvents

    });
});
const showEvent = asyncHandler(async (req,res,next) =>{
    const foundEvent = await event.findById(req.params.id).populate('category').populate('organizer');
    if(!foundEvent){
        return next(new appError("No existing event with this Id" , 404));
    }
    res.status(200).json({
        status: "success",
        message: "Event is fetched successfully !",
        data: foundEvent

    });
});
const addNewEvent = asyncHandler(async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new appError("please provide event details", 400));
    }
    const categoryExists = await category.findById(req.body.category);
    if (!categoryExists) {
        return next(new appError("please specify correct category", 404));
    }
    req.body.organizer = req.user.id;

    const newEvent = await event.create(req.body);
    res.status(201).json({
        status: "success",
        message: "Event is created successfully !",
        data: newEvent

    });
});
const editEvent = asyncHandler(async (req,res,next) => {
        const editedEvent = await event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!editedEvent) {
        return next(new appError("Failed to update", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Event is Edited successfully !",
        data: editedEvent

    });
});
const cancelEvent = asyncHandler(async (req,res,next) =>{
        const canceledEvent = await event.findByIdAndDelete(req.params.id);
    if (!canceledEvent) {
        return next(new appError("The event doesn't exist", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Event is deleted successfully !",
        data: null

    });
});

module.exports = {listAllEvents,addNewEvent,showEvent,editEvent,cancelEvent };