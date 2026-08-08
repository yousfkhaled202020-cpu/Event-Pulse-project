const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        unique: true,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        default:"",
    },
    slug: {
        type: String,
        required: [true, "Please Enter the slug of the Category"],
        unique: true,
        trim: true,
        default:"",
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Category', categorySchema);