import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { connectRedis } from "./lib/redis";
import { shutdown } from "./lib/shutdown";
import { connectionOnEventHandler } from "./event/io.handler";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

(async () => {
  await connectRedis();
})();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", connectionOnEventHandler);

const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log(`⚡ Socket.IO server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => shutdown("Ctrl+C (SIGINT)", httpServer));
process.on("SIGTERM", () => shutdown("Process Stop (SIGTERM)", httpServer));

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  shutdown("uncaughtException", httpServer);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  shutdown("unhandledRejection", httpServer);
});
