import './styling/Projects.css';
import FloatingChat from './Chat';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Projects = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleChat = () => {
		setIsOpen((prev) => !prev);
	};

	const closeChat = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const container = document.querySelector('.projects-container');
		setTimeout(() => {
			container.classList.add('fade-in');
		}, 100);
	});

	return (
		<>
			<div className="projects-container">
				<div className="projects-container-text">
					<h2>Web projects made for learning and testing purposes</h2>
					<div className="projects-list">
						<ul>
							<li>
								<h3 className="chatbot-link">
									<span onClick={toggleChat}>Chatbot</span>
								</h3>
								<p>
									An AI chatbot is implemented to the site with Google Gemini. It
									is located at bottom right of this page. You can ask it any
									question and it will try to answer it. It is not perfect, but it
									is a good example of how AI can be used in web development.
									Remember to not give any personal info!{' '}
								</p>
							</li>
							<li>
								<h3>
									<Link to="/projects/snake">Snake game</Link>
								</h3>
								<p>
									A simple snake game made with HTML, CSS, and JavaScript. The
									game includes a high score feature. The results will be saved
									and added to the leaderboard database. I wanted to try to add a
									simple game that uses the database from the backend to store
									scores. Try to reach the #1 spot! Original source code is from{' '}
									<a
										href="https://www.codingnepalweb.com/create-snake-game-htm-css-javascript"
										target="_blank"
										rel="noopener noreferrer"
									>
										here.{' '}
									</a>
									The game is modified to use Redux for state management and to
									save scores to the database.
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<FloatingChat isOpen={isOpen} toggleChat={toggleChat} closeChat={closeChat} />
		</>
	);
};
