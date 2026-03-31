const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const activityModel = mongoose.model("activity", activitySchema);

module.exports = activityModel;
