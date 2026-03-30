const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      content: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
