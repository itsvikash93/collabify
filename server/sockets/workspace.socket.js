const chatModel = require("../models/chat.model");

const workspaceSocket = (io, socket) => {
  socket.on("workspace:join", ({ workspaceId }) => {
    const room = `workspace:${workspaceId}`;
    socket.join(room);
    console.log(`User ${socket.id} joined ${room}`);
  });

  socket.on("workspace:leave", ({ workspaceId }) => {
    const room = `workspace:${workspaceId}`;
    socket.leave(room);
    console.log(`User ${socket.id} left ${room}`);
  });

  socket.on("chat:send-message", async ({ workspaceId, content, senderId }) => {
    if (!workspaceId || !content || !senderId) return;
    
    try {
      let chat = await chatModel.findOne({ workspace: workspaceId });
      if (!chat) {
        chat = new chatModel({ workspace: workspaceId, messages: [] });
      }
      
      const newMessage = {
        sender: senderId,
        content,
        timestamp: new Date()
      };
      
      chat.messages.push(newMessage);
      await chat.save();
      
      // Re-fetch populated message to guarantee users instantly see names instead of ID strings without needing a DB merge manually
      const populatedChat = await chatModel.findById(chat._id).populate("messages.sender", "name email");
      const broadcastMessage = populatedChat.messages[populatedChat.messages.length - 1];

      const room = `workspace:${workspaceId}`;
      io.to(room).emit("chat:receive-message", broadcastMessage);
    } catch (err) {
      console.error("Socket chat error:", err);
    }
  });
};

module.exports = workspaceSocket;
