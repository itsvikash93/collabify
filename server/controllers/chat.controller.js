const chatModel = require("../models/chat.model");

module.exports.getWorkspaceChats = async (req, res) => {
  try {
    const { id: workspaceId } = req.params;
    let chat = await chatModel.findOne({ workspace: workspaceId }).populate(
      "messages.sender",
      "name email"
    );

    if (!chat) {
      chat = await chatModel.create({ workspace: workspaceId, messages: [] });
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
