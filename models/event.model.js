const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        required: [true, "Name is required"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required:true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    capacity: {
        type: Number,
        min: 1,
        required: [true, "Please specify event capacity"]
    },
    date: {
        type: Date,
        required: [true, "Please specify event date"]
    },
    address: {
        city: {
            type: String,
            minlength: 3,
            trim: true,
            required: [true, "please specify the city"]
        },
        street: {
            type: String,
            minlength: 3,
            trim: true,
            required: [true, "please specify the street"]
        },
        details: { //addtional details
            type: String,
            minlength: 3,
            maxlength:500,
            trim: true,
        }
    },
    venue: {
        type: String,
        required: true,
        trim: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Event', eventSchema);