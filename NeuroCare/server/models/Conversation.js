const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
    {
        participants: {
            type: [String], // Array of email addresses
            required: true,
            
        },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message", // Referencing the Message model
            },
        ],
    },
    { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;