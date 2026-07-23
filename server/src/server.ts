import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: env.CLIENT_ORIGIN,
    credentials: true
  }
});

io.on("connection", (socket) => {
  logger.info(`Socket client connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    logger.info(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on("friend_activity", (data) => {
    socket.broadcast.emit("friend_activity_update", data);
  });

  socket.on("disconnect", () => {
    logger.info(`Socket client disconnected: ${socket.id}`);
  });
});

server.listen(env.PORT, () => {
  logger.info(`Spotify Backend API server listening on http://localhost:${env.PORT}`);
});
