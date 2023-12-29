import { io } from "socket.io-client";

const PORT = Number(process.env.PORT) || 3000;

export default function socketClient() {
  console.log(`${PORT + 1}`);

  const socket = io(`:${PORT + 1}`, {
    path: "/api/socket",
    addTrailingSlash: false,
  });

  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  socket.on("connect_error", async (err) => {
    console.log(`connect_error due to ${err.message}`);
    await fetch("/api/socket");
  });

  return socket;
}
