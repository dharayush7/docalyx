import { SocketContext } from "@/context/socket-context";
import { useContext } from "react";

const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

export default useSocket;
