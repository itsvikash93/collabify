const workspaceModel = require("../models/workspace.model");
const taskModel = require("../models/task.model");

module.exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await workspaceModel.find();
    res.status(200).json(workspaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getWorkspaceById = async (req, res) => {
  try {
    const workspace = await workspaceModel.findById(req.params.id);
    res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createWorkspace = async (req, res) => {
  try {
    const workspace = await workspaceModel.create(req.body);
    res.status(201).json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateWorkspace = async (req, res) => {
  try {
    const workspace = await workspaceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteWorkspace = async (req, res) => {
  try {
    const workspace = await workspaceModel.findByIdAndDelete(req.params.id);
    await taskModel.deleteMany({ workspace: req.params.id });
    res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
