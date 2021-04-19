const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  participants: [{ type: String }],
  messages: [
    {
      name: { type: String },
      message: { type: String },
      media: { type: String },
      date: { type: String },
      time: { type: String },
      seen: { type: Boolean, default: false },
      deleteForMe: { type: Boolean, default: false },
    },
  ],
});

const ChatModel = new mongoose.model("chatModel", chatSchema);
module.exports = ChatModel;
