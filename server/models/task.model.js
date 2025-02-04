const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["To-Do", "In-Progress", "Done"],
      default: "To-Do",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    deadline: { type: Date },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },
  },
  { timestamps: true }
);

taskSchema.pre("save", function (next) {
  if (this.deadline && this.deadline < Date.now()) {
    throw new Error("Deadline must be a future date.");
  }
  next();
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
