"use client";

import { SocketContext } from "@/context/socket-context";
import { SERVER_SOCKET_URL } from "@/lib/constants";
import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function SocketProvider({ children }: React.PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(SERVER_SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
    setSocket(socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
}
