const taskModel = require("../models/task.model");
const workspaceModel = require("../models/workspace.model");

module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ workspace: req.params.workspaceId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createTask = async (req, res) => {
  try {
    const task = await taskModel.create({
      ...req.body,
      workspace: req.params.workspaceId,
    });
    await workspaceModel.findByIdAndUpdate(req.params.workspaceId, {
      $push: { tasks: task._id },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.taskId);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      {
        new: true,
      }
    );

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
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
