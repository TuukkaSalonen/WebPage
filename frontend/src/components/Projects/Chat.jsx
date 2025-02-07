import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../redux/thunks/chat.ts';
import '../styling/Chat.css';
import CircularProgress from '@mui/material/CircularProgress';

const FloatingChat = ({isOpen, toggleChat, closeChat}) => {
	const [input, setInput] = useState('');
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.chat.messages);
	const loading = useSelector((state) => state.chat.loading);

	const handleSend = () => {
		if (input.trim() !== '') {
			dispatch(sendMessage(input));
			setInput('');
		}
	};

	return (
		<>
			<div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
				<div className="chatbox-header">
					<h3 className='chat-title'>Chat with Gemini AI</h3>
					<button onClick={closeChat} className="close-btn">
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
						{loading && (
							<div className="message bot">
								<CircularProgress color="001f3f" size={20} />
							</div>
						)}
					</div>
				</div>
				<div className="chatbox-input">
					<input
						type="text"
						id='chat-input'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSend()}
						placeholder="Type a message..."
					/>
					<button onClick={handleSend}>Send</button>
				</div>
			</div>
			<div className="chat-icon" onClick={toggleChat}>
				<img src="/chatbot.png" alt="Chat Icon" />
			</div>
		</>
	);
};

export default FloatingChat;
