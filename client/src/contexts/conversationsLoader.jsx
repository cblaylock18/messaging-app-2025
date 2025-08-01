import { useContext, createContext } from "react";

export function useConversations() {
    return useContext(ConversationsContext);
}

export const ConversationsContext = createContext();
