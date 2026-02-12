const http = require("http");
const WebSocket = require("ws");
const setupWSConnection = require("y-websocket/bin/utils").setupWSConnection;

const startEditorSocketServer = () => {
  const server = http.createServer();

  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const url = req.url || "/";
    const docName = url.replace("/", "");

    if (!docName) {
      console.log("❌ Invalid doc name");
      ws.close();
      return;
    }

    console.log("User connected to document:", docName);

    setupWSConnection(ws, req, {
      docName,
      gc: true,
    });
  });

  server.listen(1234, () => {
    console.log("Yjs WebSocket Server running at ws://localhost:1234");
  });
};

module.exports = startEditorSocketServer;
