const activityModel = require("../models/activity.model");

module.exports.getActivities = async (req, res) => {
  try {
    const activities = await activityModel
      .find({ workspace: req.params.workspaceId })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(50); // Get the latest 50 activities for performance
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
