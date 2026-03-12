import { useEffect, useState } from "react";
import "./css/Messages.css";
import { messageApi } from "../../services/api";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await messageApi.get("");
      setMessages(response.data || []);
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };

  return (
    <div className="messages-container">
      <h2>Contact Messages</h2>

      <table className="messages-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty-row">
                No messages found
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td className="message-text">{msg.text}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Messages;