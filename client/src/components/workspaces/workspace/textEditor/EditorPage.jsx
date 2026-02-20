// import React, { useEffect, useRef } from "react";
// import { connectWS } from "./ws";
// import { useParams } from "react-router-dom";
// import { joinWorkspaceRoom, leaveWorkspaceRoom } from "../../../../socket/workspaceSocket";

// const EditorPage = () => {
//   const socket = useRef(null);

//   const { workspaceId } = useParams();

//   useEffect(() => {
//     socket.current = connectWS();

//     joinWorkspaceRoom(workspaceId);

//     socket.current.on("editor:receive-changes", (data) => {
//       console.log("Incoming changes:", data);
//     });

//     return () => {
//       leaveWorkspaceRoom(workspaceId);
//       socket.current.off("editor:receive-changes");
//       socket.current.disconnect();
//     };
//   }, [workspaceId]);

//   const handleChange = (content) => {
//     socket.current.emit("editor:send-changes", {
//       workspaceId,
//       content,
//     });
//   };

//   // useEffect(() => {
//   //   socket.current = connectWS();
//   //   socket.current.on("connect", () => {
//   //     console.log("Connected to server", socket.current.id);
//   //   });

//   //   return () => {
//   //     socket.current.on("disconnect", () => {
//   //       console.log("Disconnected from server");
//   //     });
//   //     socket.current.disconnect();
//   //   };
//   // }, []);
//   return <div className="bg-[#eef7f6]">EditorPage</div>;
// };

// export default EditorPage;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../../../socket/socket";
import Chats from "./Chats";
import RealTimeEditor from "./RealTimeEditor";

const EditorPage = () => {
  const { workspaceId } = useParams();
  const handleReceiveChanges = (data) => {
    console.log("Incoming changes:", data);
  };

  useEffect(() => {
    // connect only if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // join workspace room
    socket.emit("workspace:join", { workspaceId });

    socket.on("editor:receive-changes", handleReceiveChanges);

    return () => {
      socket.emit("workspace:leave", { workspaceId });
      socket.off("editor:receive-changes", handleReceiveChanges);
    };
  }, [workspaceId]);

  const handleChange = (content) => {
    socket.emit("editor:send-changes", {
      workspaceId,
      content,
    });
  };

  return (
    <div className="flex h-full w-full gap-4 overflow-hidden">
      <RealTimeEditor />
      <Chats />
    </div>
  );
};

export default EditorPage;
