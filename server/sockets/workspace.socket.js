const chatModel = require("../models/chat.model");

// Global map to track user presence: workspaceId -> Map(socketId -> { userId, userName })
const activeWorkspaceUsers = new Map();

const getUniqueUsersList = (workspaceId) => {
  if (!activeWorkspaceUsers.has(workspaceId)) return [];
  const usersMap = activeWorkspaceUsers.get(workspaceId);
  
  // Use a Map to deduplicate users by userId
  const distinctUsers = new Map();
  for (const user of usersMap.values()) {
    if (user && user.userId) {
      distinctUsers.set(user.userId, user);
    }
  }
  return Array.from(distinctUsers.values());
};

const workspaceSocket = (io, socket) => {
  socket.on("workspace:join", ({ workspaceId, userId, userName }) => {
    if (!workspaceId) return;
    const room = `workspace:${workspaceId}`;
    socket.join(room);
    
    if (!activeWorkspaceUsers.has(workspaceId)) {
      activeWorkspaceUsers.set(workspaceId, new Map());
    }
    
    // Assign specific hardware session mapping to secure user account ID and Name
    if (userId) {
      activeWorkspaceUsers.get(workspaceId).set(socket.id, { userId, userName: userName || "User" });
    }

    // Isolate absolute list of individual accounts actively connected
    const uniqueUsersList = getUniqueUsersList(workspaceId);
    io.to(room).emit("workspace:online-users", uniqueUsersList);
  });

  socket.on("workspace:leave", ({ workspaceId }) => {
    if (!workspaceId) return;
    const room = `workspace:${workspaceId}`;
    socket.leave(room);
    
    if (activeWorkspaceUsers.has(workspaceId)) {
      activeWorkspaceUsers.get(workspaceId).delete(socket.id);
      const uniqueUsersList = getUniqueUsersList(workspaceId);
      io.to(room).emit("workspace:online-users", uniqueUsersList);
    }
  });

  socket.on("disconnect", () => {
    // Globally clean unclosed tabs dropping socket pipes
    for (const [workspaceId, usersMap] of activeWorkspaceUsers.entries()) {
      if (usersMap.has(socket.id)) {
        usersMap.delete(socket.id);
        const uniqueUsersList = getUniqueUsersList(workspaceId);
        io.to(`workspace:${workspaceId}`).emit("workspace:online-users", uniqueUsersList);
      }
    }
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
