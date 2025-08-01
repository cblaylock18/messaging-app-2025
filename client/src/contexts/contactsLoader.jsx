import { useContext, createContext } from "react";

export function useContacts() {
    return useContext(ContactsContext);
}

export const ContactsContext = createContext();
