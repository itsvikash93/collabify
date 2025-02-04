const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "No description provided." },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["Admin", "Member", "Viewer"],
          default: "Member",
        },
      },
    ],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  },
  { timestamps: true }
);

workspaceSchema.pre("save", function (next) {
  if (this.members.length === 0) {
    this.members.push({ userId: this.createdBy, role: "Admin" });
  }
  next();
});

const workspaceModel = mongoose.model("workspace", workspaceSchema);

module.exports = workspaceModel;
