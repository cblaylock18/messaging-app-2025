import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/contactsLoader";

export default function NewContactModal({ closeModal }) {
    const idRef = useRef();
    const nameRef = useRef();
    const { createContact } = useContacts();

    function handleSubmit(e) {
        e.preventDefault();

        createContact(idRef.current.value, nameRef.current.value);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control
                            type="text"
                            ref={idRef}
                            placeholder="Enter contact id"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            ref={nameRef}
                            placeholder="Enter contact name"
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="mt-4">
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </>
    );
}
