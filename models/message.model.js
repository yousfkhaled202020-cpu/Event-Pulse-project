const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        minlength: 1,
        maxlength: 500,
        required: [true, "your message is empty"],
        trim: true,
        default: "Hi"
    },
    isRead: {
        type: Boolean,
        default: false,
    },

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Message', messageSchema);