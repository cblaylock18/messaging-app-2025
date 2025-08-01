import { useState } from "react";
import { SocketContext } from "./socketLoader";
import { useEffect } from "react";
import io from "socket.io-client";

export function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io("http://localhost:5000", {
            query: {
                id,
            },
        });

        setSocket(newSocket);

        return () => newSocket.close();
    }, [id]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
