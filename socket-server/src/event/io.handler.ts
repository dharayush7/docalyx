import { Socket } from "socket.io";
import { redis } from "../lib/redis";
import { Nullable } from "../lib/type";
import { getSocketRadisKey, getUserRadisKey } from "../lib/keys";
import { ConnectionModel } from "../model/connection.model";

export async function connectionOnEventHandler(socket: Socket) {
  console.log("Client connected:", socket.id);
  socket.on("auth", async (data) => {
    const userId = data.userId as Nullable<string>;
    const chatId = data.chatId as Nullable<string>;

    if (userId) {
      const connection = new ConnectionModel({
        socketId: socket.id,
        serverId: 1,
        status: "connected",
        userId: userId,
        chatId: chatId ?? null,
      });
      await Promise.all([
        redis.set(getUserRadisKey(userId), connection.toStringify()),
        redis.set(getSocketRadisKey(socket.id), connection.toStringify()),
      ]);
    }
  });

  socket.on("disconnect", async () => {
    console.log("Client disconnected:", socket.id);
    const radisValue = await redis.get(getSocketRadisKey(socket.id));
    if (!radisValue) return;
    const connection = ConnectionModel.fromJSON(radisValue);
    await Promise.all([
      redis.del(getUserRadisKey(connection.userId)),
      redis.del(getSocketRadisKey(socket.id)),
    ]);
  });
}
