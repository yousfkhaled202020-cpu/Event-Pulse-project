const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registrationSchema = new Schema({
    event: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required:true
    },
    attendee: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
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


registrationSchema.index({ event: 1 , attendee: 1}, { unique: true});


module.exports = mongoose.model('Registration', registrationSchema);