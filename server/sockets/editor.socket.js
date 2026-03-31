// const editorSocket = (io, socket) => {

//   socket.on("join-document", ({ documentId }) => {
//     socket.join(documentId);
//     console.log(`User joined document ${documentId}`);
//   });

//   socket.on("send-changes", ({ documentId, content }) => {
//     socket.to(documentId).emit("receive-changes", content);
//   });

// };

// module.exports = editorSocket;

const editorSocket = (io, socket) => {
  socket.on("editor:send-changes", ({ workspaceId, delta }) => {
    const room = `workspace:${workspaceId}`;
    socket.to(room).emit("editor:receive-changes", delta);
  });

  socket.on("editor:cursor-move", ({ workspaceId, userId, userName, range }) => {
    const room = `workspace:${workspaceId}`;
    console.log({ workspaceId, userId, userName, range });

    socket.to(room).emit("editor:receive-cursor", {
      userId,
      userName,
      range,
      socketId: socket.id,
    });
  });
};

module.exports = editorSocket;
