import { io } from "socket.io-client";

export default function socketClient() {
  const socket = io(":3001", { path: "/api/socket", addTrailingSlash: false });
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
