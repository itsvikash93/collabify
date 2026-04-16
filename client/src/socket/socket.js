// src/socket/socket.js
import { io } from "socket.io-client";

// Replace /api with empty string to connect to root namespace for sockets
const SOCKET_URI = import.meta.env.VITE_API_URI.replace("/api", "");

export const socket = io(SOCKET_URI, {
  withCredentials: true,
  autoConnect: false, // important
});
