import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/contactsLoader";
import { useConversations } from "../contexts/conversationsLoader";
import { useState } from "react";

export default function NewConversationModal({ closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    function handleCheckboxChange(contactId) {
        setSelectedContactIds((prevSelected) => {
            if (prevSelected.includes(contactId)) {
                return prevSelected.filter((id) => id !== contactId);
            } else {
                return [...prevSelected, contactId];
            }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        createConversation(selectedContactIds);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map((contact) => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() =>
                                    handleCheckboxChange(contact.id)
                                }
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit" className="mt-4">
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </>
    );
}
