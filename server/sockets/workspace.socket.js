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
};

module.exports = workspaceSocket;
