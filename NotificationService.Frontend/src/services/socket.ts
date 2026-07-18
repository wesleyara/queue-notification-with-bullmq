import { io, Socket } from "socket.io-client";

let socket: null | Socket = null;

export function connectSocket(recipient: string): Socket {
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_SOCKET_URL);

  socket.on("connect", () => {
    socket?.emit("register", { recipient });
  });

  return socket;
}

export function getSocket(): null | Socket {
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
