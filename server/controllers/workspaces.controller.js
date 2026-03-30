const workspaceModel = require("../models/workspace.model");
const taskModel = require("../models/task.model");
const crypto = require("crypto");

module.exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await workspaceModel.find({
      "members.userId": req.userId,
    }).populate("members.userId", "name email");
    res.status(200).json(workspaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getWorkspaceById = async (req, res) => {
  try {
    const workspace = await workspaceModel.findById(req.params.id).populate("members.userId", "name email");
    res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Workspace name is required" });
    }

    const inviteCode = crypto.randomBytes(4).toString("hex");

    const workspace = await workspaceModel.create({
      name,
      description,
      inviteCode,
      createdBy: req.userId,
    });
    const populatedWorkspace = await workspaceModel.findById(workspace._id).populate("members.userId", "name email");
    console.log(populatedWorkspace, "workspace created");
    res.status(201).json(populatedWorkspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.joinWorkspace = async (req, res) => {
  try {
    const { inviteCode } = req.params;
    const workspace = await workspaceModel.findOne({ inviteCode });

    if (!workspace) {
      return res.status(404).json({ message: "Invalid or expired invite link" });
    }

    // Check if user is already a member
    const isMember = workspace.members.some(
      (m) => m.userId.toString() === req.userId
    );

    if (isMember) {
      return res.status(400).json({ message: "You are already a member of this workspace" });
    }

    // Add user as a member
    workspace.members.push({ userId: req.userId, role: "Member" });
    await workspace.save();

    const populatedWorkspace = await workspaceModel.findById(workspace._id).populate("members.userId", "name email");

    res.status(200).json({ message: "Joined workspace successfully", workspace: populatedWorkspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateWorkspace = async (req, res) => {
  try {
    const workspace = await workspaceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
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
