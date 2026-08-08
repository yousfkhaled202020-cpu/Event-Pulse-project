const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registratonSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        trim: true,
        select: false, // to prevent accidentally selecting password in any function
        required: [true, "Password is required"]

    },
    role: {
        type: String,
        enum: {
            values: ["attendee"],
            message: 'Registration is only open to attendees. Admins cannot register here.'
        },
        default: "attendee"
    },
    age: {
        type: Number,
        min: 10,
        required: [true, "Age is required"]
    }
},
{
    timestamps:true
});








module.exports = mongoose.model('Registration', registratonSchema);