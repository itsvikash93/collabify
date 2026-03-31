const taskModel = require("../models/task.model");
const workspaceModel = require("../models/workspace.model");
const activityModel = require("../models/activity.model");

module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ workspace: req.params.workspaceId }).populate("assignedTo", "name email");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createTask = async (req, res) => {
  try {
    const rawTask = await taskModel.create({
      ...req.body,
      workspace: req.params.workspaceId,
    });
    
    const task = await taskModel.findById(rawTask._id).populate("assignedTo", "name email");

    await workspaceModel.findByIdAndUpdate(req.params.workspaceId, {
      $push: { tasks: task._id },
    });
    await activityModel.create({
      workspace: req.params.workspaceId,
      user: req.userId,
      message: `Added new task '${task.title}' to ${task.status}`,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.taskId).populate("assignedTo", "name email");
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const oldTask = await taskModel.findById(req.params.taskId);
    const task = await taskModel.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      {
        new: true,
      }
    ).populate("assignedTo", "name email");

    if (oldTask && oldTask.status !== task.status) {
      await activityModel.create({
        workspace: task.workspace,
        user: req.userId,
        message: `Moved task '${task.title}' from ${oldTask.status} to ${task.status}`,
      });
    } else if (oldTask && oldTask.assignedTo?.toString() !== task.assignedTo?._id?.toString()) {
      await activityModel.create({
        workspace: task.workspace,
        user: req.userId,
        message: task.assignedTo ? `Assigned task '${task.title}' to ${task.assignedTo.name}` : `Removed assignment for task '${task.title}'`,
      });
    } else if (oldTask && oldTask.title !== task.title) {
      await activityModel.create({
        workspace: task.workspace,
        user: req.userId,
        message: `Updated task '${oldTask.title}' to '${task.title}'`,
      });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.taskId);
    await workspaceModel.findByIdAndUpdate(req.params.workspaceId, {
      $pull: { tasks: task._id },
    });
    if (task) {
      await activityModel.create({
        workspace: req.params.workspaceId,
        user: req.userId,
        message: `Deleted task '${task.title}'`,
      });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
