const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        default: "",
        required: [true, "Name is required"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    capacity: {
        type: Number,
        min: 1,
        default: 10,
        required: [true, "Please specify event capacity"]
    },
    date: {
        type: Date,
        defualt: Date.now(),
        required: [true, "Please specify event date"]
    },
    address: {
        city: {
            type: String,
            default: "",
            minlenght: 3,
            trim: true,
            required: [true, "please specify the city"]
        },
        street: {
            type: String,
            default: "",
            minlenght: 3,
            trim: true,
            required: [true, "please specify the street"]
        },
        details: { //addtional details
            type: String,
            default: "",
            minlenght: 3,
            trim: true,
        }
    },

},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Event', eventSchema);