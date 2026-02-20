// const editorSocket = require("./editor.socket");

// const initializeSockets = (io) => {
//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     editorSocket(io, socket);

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });
// };

// module.exports = initializeSockets;

const workspaceSocket = require("./workspace.socket");
const editorSocket = require("./editor.socket");

const initializeSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    workspaceSocket(io, socket);
    editorSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = initializeSockets;
