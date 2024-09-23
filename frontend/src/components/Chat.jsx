import React, { useState } from 'react';
import './styling/Chat.css';
import { fetchChatRequest } from '../redux/actionCreators/thunks/chat.ts';

//Lisää chatbot kysymykset/vastaukset state storeen

const FloatingChat = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');

	const toggleChatbox = () => {
		setIsOpen(!isOpen);
	};

	const handleSend = async () => {
		if (input.trim()) {
			const newMessage = { text: input, sender: 'user' };
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			setInput('');
			const botResponse = await fetchChatRequest(newMessage.text);
			setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
		}
	};

	return (
		<>
			<div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
				<div className="chatbox-header">
					<h3>Chat with Gemini AI</h3>
					<button onClick={toggleChatbox} className="close-btn">
						&times;
					</button>
				</div>
				<div className="chatbox-body">
					<div className="messages">
						{messages.map((message, index) => (
							<div key={index} className={`message ${message.sender}`}>
								{message.text}
							</div>
						))}
					</div>
				</div>
				<div className="chatbox-input">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSend()}
						placeholder="Type a message..."
					/>
					<button onClick={handleSend}>Send</button>
				</div>
			</div>
			<div className="chat-icon" onClick={toggleChatbox}>
				<img src="/chatbot.png" alt="Chat Icon" />
			</div>
		</>
	);
};

export default FloatingChat;
