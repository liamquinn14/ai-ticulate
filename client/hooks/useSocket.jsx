import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import config from "../configs/config";

const { SOCKET_URL } = config;
/**
 *type SocketContext = {
    messages: string[];
    message: string;
    setMessage: (e: React.FormEvent<HTMLInputElement>) => void;
    sendMessage: () => void;
  }; 
 */
const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  /*
   * messages: string[]
   */
  const [messages, setMessages] = useState([]);
  /*
   * message: string
   */
  const [message, setMessage] = useState("");

  /*
   * ws: Socket | null
   */
  const ws = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    ws.current = socket;
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    ws.current?.emit("message", message);
    setMessage("");
  };

  return (
    <SocketContext.Provider
      value={{
        messages,
        message,
        setMessage: (e) => setMessage(e.currentTarget.value),
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
