// src/socket/socket.js
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URI, {
  withCredentials: true,
  autoConnect: false, // important
});
