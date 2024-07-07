import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server_url } from "./constants/envConfig";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const socket = useMemo(() => io(server_url, 
    { 
      withCredentials: true,
      auth: {
        token: token
      } 
    }), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };