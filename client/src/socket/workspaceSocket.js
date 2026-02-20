import { socket } from "./socket";

export const joinWorkspaceRoom = (workspaceId) => {
  socket.emit("workspace:join", { workspaceId });
};

export const leaveWorkspaceRoom = (workspaceId) => {
  socket.emit("workspace:leave", { workspaceId });
};
