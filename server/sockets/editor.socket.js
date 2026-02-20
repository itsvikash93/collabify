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
  socket.on("editor:send-changes", ({ workspaceId, content }) => {
    const room = `workspace:${workspaceId}`;
    socket.to(room).emit("editor:receive-changes", content);
  });

  socket.on("editor:cursor-move", ({ workspaceId, userId, range }) => {
    const room = `workspace:${workspaceId}`;
    // console.log("Cursor moved:", range);

    socket.to(room).emit("editor:receive-cursor", {
      userId,
      range,
      socketId: socket.id,
    });
  });
};

module.exports = editorSocket;
