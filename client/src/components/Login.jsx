import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";

export default function Login({ onIdSubmit }) {
    const idRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onIdSubmit(idRef.current.value);
    }

    function createNewId(e) {
        e.preventDefault();

        onIdSubmit(uuid());
    }

    return (
        <Container className="align-items-center d-flex vh-100">
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter your ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ID"
                        ref={idRef}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="mt-3 me-2">
                    Login
                </Button>
                <Button
                    onClick={createNewId}
                    variant="secondary"
                    className="mt-3"
                >
                    Create a New Id
                </Button>
            </Form>
        </Container>
    );
}
