import { Socket } from "socket.io";
import { redis } from "../lib/redis";
import { Nullable } from "../lib/type";
import { getSocketRadisKey, getUserRadisKey } from "../lib/keys";
import { ConnectionModel, SocketModel } from "../model/connection.model";

export async function connectionOnEventHandler(socket: Socket) {
  console.log("Client connected:", socket.id);
  socket.on("auth", async (data) => {
    const userId = data.userId as Nullable<string>;
    const chatId = data.chatId as Nullable<string>;
    const route = data.route as Nullable<string>;

    if (userId && route) {
      const socketModel = new SocketModel({
        socketId: socket.id,
        serverId: 1,
        status: "connected",
        userId: userId,
        chatId: chatId ?? null,
        route: route,
      });
      const connection = await redis.get(getUserRadisKey(userId));
      if (connection) {
        const connectionModel = ConnectionModel.fromJSON(connection);
        connectionModel.appendSocket(socketModel);
        await redis.set(getUserRadisKey(userId), connectionModel.toStringify());
        await redis.set(
          getSocketRadisKey(socket.id),
          socketModel.toStringify()
        );
      } else {
        const connectionModel = new ConnectionModel({
          sockets: [socketModel],
          userId: userId,
        });
        await redis.set(getUserRadisKey(userId), connectionModel.toStringify());
        await redis.set(
          getSocketRadisKey(socket.id),
          socketModel.toStringify()
        );
      }
    }
  });

  socket.on("disconnect", async () => {
    console.log("Client disconnected:", socket.id);
    const socketValue = await redis.get(getSocketRadisKey(socket.id));
    if (socketValue) {
      const socketModel = SocketModel.fromJSON(socketValue);
      const connectionValue = await redis.get(
        getUserRadisKey(socketModel.userId)
      );

      if (connectionValue) {
        const connectionModel = ConnectionModel.fromJSON(connectionValue);
        connectionModel.deleteSocket(socket.id);
        await redis.set(
          getUserRadisKey(socketModel.userId),
          connectionModel.toStringify()
        );
        await redis.del(getSocketRadisKey(socket.id));
      }
    }
  });
}
