const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        default:"" ,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        default:"" ,
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        trim:true,
        select:false, // to prevent accidentally selecting password in any function
        default:"" ,
        required: [true, "Password is required"]

    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);