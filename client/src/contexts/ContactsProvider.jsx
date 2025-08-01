import useLocalStorage from "../hooks/useLocalStorage";
import { ContactsContext } from "./contactsLoader";

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useLocalStorage("contacts", []);

    function createContact(id, name) {
        setContacts((previousContacts) => [...previousContacts, { id, name }]);
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    );
}
