import useLocalStorage from "../hooks/useLocalStorage";
import { ConversationsContext } from "./conversationsLoader";
import { useContacts } from "./contactsLoader";
import { useSocket } from "./socketLoader";
import { useState, useEffect, useCallback } from "react";

export function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorage(
        "conversations",
        []
    );
    const [selectConversationIndex, setSelectConversationIndex] = useState(0);
    const { contacts } = useContacts();
    const socket = useSocket();

    function createConversation(recipients) {
        setConversations((previousConversations) => [
            ...previousConversations,
            { recipients, messages: [] },
        ]);
    }

    const addMessageToConversation = useCallback(
        ({ recipients, text, sender }) => {
            setConversations((previousConversations) => {
                let madeChange = false;
                const newMessage = { sender, text };

                const newConversations = previousConversations.map(
                    (conversation) => {
                        if (
                            arrayEquality(conversation.recipients, recipients)
                        ) {
                            madeChange = true;
                            return {
                                ...conversation,
                                messages: [
                                    ...conversation.messages,
                                    newMessage,
                                ],
                            };
                        }
                        return conversation;
                    }
                );

                if (madeChange) {
                    return newConversations;
                } else {
                    return [
                        ...previousConversations,
                        { recipients, messages: [newMessage] },
                    ];
                }
            });
        },
        [setConversations]
    );

    useEffect(() => {
        if (!socket) return;

        socket.on("receive-message", addMessageToConversation);

        return () => socket.off("receive-message");
    }, [socket, addMessageToConversation]);

    function sendMessage(recipients, text) {
        socket.emit("send-message", { recipients, text });

        addMessageToConversation({
            recipients,
            text,
            sender: id,
        });
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map((recipient) => {
            const contact = contacts.find((c) => c.id === recipient);
            const name = (contact && contact.name) || recipient;
            return {
                id: recipient,
                name,
            };
        });

        const messages = conversation.messages.map((message) => {
            const contact = contacts.find((c) => c.id === message.sender);
            const name = (contact && contact.name) || message.sender;

            const fromMe = id === message.sender;
            return { ...message, senderName: name, fromMe };
        });

        const selected = index === selectConversationIndex;

        return {
            ...conversation,
            messages,
            recipients,
            selected,
        };
    });

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectConversationIndex],
        selectConversationIndex: setSelectConversationIndex,
        sendMessage,
        createConversation,
    };

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false;

    const aSorted = [...a].sort();
    const bSorted = [...b].sort();

    return aSorted.every((element, index) => element === bSorted[index]);
}
