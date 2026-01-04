import http from "http";
import { redis } from "./redis";

export async function shutdown(reason: string, server: http.Server) {
  console.log(`Shutting down due to: ${reason}`);

  await new Promise<void>((resolve) => {
    server.close(() => {
      console.log("HTTP server closed");
      resolve();
    });
  });

  try {
    if (redis.isOpen) {
      await redis.close();
      console.log("Redis connection closed");
    }
  } catch (err) {
    console.error("Failed to close Redis connection:", err);
  }

  console.log("Exit complete");
  process.exit(0);
}
