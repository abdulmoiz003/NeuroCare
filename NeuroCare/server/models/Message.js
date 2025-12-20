const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        senderEmail: {
            type: String,
            required: true,
        },
        receiverEmail: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
            maxlength: 1000,
            trim: true,
            
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;