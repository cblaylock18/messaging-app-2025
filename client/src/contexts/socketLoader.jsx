import { useContext, createContext } from "react";

export function useSocket() {
    return useContext(SocketContext);
}

export const SocketContext = createContext();
