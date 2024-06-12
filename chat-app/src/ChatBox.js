import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function ChatBox() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const newMessage = { sender: 'user', text: message };
        setMessages([...messages, newMessage]);

        try {
            const res = await axios.post('http://localhost:5000/chat', { message });
            const botMessage = { sender: 'bot', text: res.data.response };
            setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
        setMessage('');
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <img src="image/doc.png" alt="bot" width="40" height="40" />
                <span>Medical Bot</span>
            </div>
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className="message-content">
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type something to send..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatBox;
