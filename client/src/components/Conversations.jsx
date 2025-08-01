import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/conversationsLoader";

export default function Conversations() {
    const { conversations, selectConversationIndex } = useConversations();

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (
                <ListGroup.Item
                    key={index}
                    active={conversation.selected}
                    action
                    onClick={() => selectConversationIndex(index)}
                >
                    {conversation.recipients
                        .map((recipient) => recipient.name)
                        .join(", ")}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
