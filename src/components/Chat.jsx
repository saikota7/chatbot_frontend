import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css"

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch messages from the backend
  useEffect(() => {
    axios
      .get("https://chatbot-kxhn.onrender.com/api/messages/")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  // Filter messages based on search query
  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      axios
        .post("https://chatbot-kxhn.onrender.com/api/messages/", {
          sender: "User",
          content: newMessage,
        })
        .then((response) => {
          setMessages([...messages, response.data]);
          setNewMessage("");
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">Chatbot</h1>
      
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="message-box">
        {filteredMessages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          className="new-message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
