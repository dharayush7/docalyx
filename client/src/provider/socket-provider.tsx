"use client";

import { SocketContext } from "@/context/socket-context";
import useAuth from "@/hooks/use-auth";
import { SERVER_SOCKET_URL } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function SocketProvider({ children }: React.PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const socket = io(SERVER_SOCKET_URL);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("auth", {
        userId: user.id,
        chatId: null,
      });
    });
    setSocket(socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
}
