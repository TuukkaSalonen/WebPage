import React, { useEffect } from 'react';
import './styling/Snake.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeft,
	faArrowUp,
	faArrowRight,
	faArrowDown,
	faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

export const Snake = () => {
	useEffect(() => {
		const playBoard = document.querySelector('.play-board');
		const scoreElement = document.querySelector('.score');
		const highScoreElement = document.querySelector('.high-score');
		const controls = document.querySelectorAll('.controls i');

		let gameOver = false;
		let foodX, foodY;
		let snakeX = 5,
			snakeY = 5;
		let velocityX = 0,
			velocityY = 0;
		let snakeBody = [];
		let setIntervalId;
		let score = 0;

		// Getting high score from the local storage
		let highScore = localStorage.getItem('high-score') || 0;
		highScoreElement.innerText = `High Score: ${highScore}`;

		const updateFoodPosition = () => {
			// Passing a random 1 - 30 value as food position
			foodX = Math.floor(Math.random() * 30) + 1;
			foodY = Math.floor(Math.random() * 30) + 1;
		};

		const handleGameOver = () => {
			// Clearing the timer and reloading the page on game over
			clearInterval(setIntervalId);
			alert('Game Over! Press OK to replay...');
			window.location.reload();
		};

		const changeDirection = (e) => {
			// Changing velocity value based on key press
			if (e.key === 'ArrowUp' && velocityY !== 1) {
				velocityX = 0;
				velocityY = -1;
			} else if (e.key === 'ArrowDown' && velocityY !== -1) {
				velocityX = 0;
				velocityY = 1;
			} else if (e.key === 'ArrowLeft' && velocityX !== 1) {
				velocityX = -1;
				velocityY = 0;
			} else if (e.key === 'ArrowRight' && velocityX !== -1) {
				velocityX = 1;
				velocityY = 0;
			}
		};

		// Calling changeDirection on each key click and passing key dataset value as an object
		controls.forEach((button) =>
			button.addEventListener('click', () => changeDirection({ key: button.dataset.key }))
		);

		const initGame = () => {
			if (gameOver) return handleGameOver();
			let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

			// Checking if the snake hit the food
			if (snakeX === foodX && snakeY === foodY) {
				updateFoodPosition();
				snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
				score++; // increment score by 1
				highScore = score >= highScore ? score : highScore;
				localStorage.setItem('high-score', highScore);
				scoreElement.innerText = `Score: ${score}`;
				highScoreElement.innerText = `High Score: ${highScore}`;
			}
			// Updating the snake's head position based on the current velocity
			snakeX += velocityX;
			snakeY += velocityY;

			// Shifting forward the values of the elements in the snake body by one
			for (let i = snakeBody.length - 1; i > 0; i--) {
				snakeBody[i] = snakeBody[i - 1];
			}
			snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

			// Checking if the snake's head is out of wall, if so setting gameOver to true
			if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
				return (gameOver = true);
			}

			for (let i = 0; i < snakeBody.length; i++) {
				// Adding a div for each part of the snake's body
				html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
				// Checking if the snake head hit the body, if so set gameOver to true
				if (
					i !== 0 &&
					snakeBody[0][1] === snakeBody[i][1] &&
					snakeBody[0][0] === snakeBody[i][0]
				) {
					gameOver = true;
				}
			}
			playBoard.innerHTML = html;
		};

		updateFoodPosition();
		setIntervalId = setInterval(initGame, 100);
		document.addEventListener('keyup', changeDirection);

		return () => {
			clearInterval(setIntervalId);
			document.removeEventListener('keyup', changeDirection);
		};
	}, []);

	return (
		<div className="snake-container">
			<div className="top-bar">
				<Link to="/projects" className="back-button">
					<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
				</Link>
			</div>
			<div className="content">
				<div className="wrapper">
					<div className="game-details">
						<span className="score">Score: 0</span>
						<span className="high-score">High Score: 0</span>
					</div>
					<div className="play-board"></div>
					<div className="controls">
						<i data-key="ArrowLeft" className="fa-solid fa-arrow-left-long">
							<FontAwesomeIcon icon={faArrowLeft} />
						</i>
						<i data-key="ArrowUp" className="fa-solid fa-arrow-up-long">
							<FontAwesomeIcon icon={faArrowUp} />
						</i>
						<i data-key="ArrowRight" className="fa-solid fa-arrow-right-long">
							<FontAwesomeIcon icon={faArrowRight} />
						</i>
						<i data-key="ArrowDown" className="fa-solid fa-arrow-down-long">
							<FontAwesomeIcon icon={faArrowDown} />
						</i>
					</div>
				</div>
				<div className="leaderboard">
					<h3>Leaderboard</h3>
					<ul>
						<li>Player 1: 100</li>
						<li>Player 2: 90</li>
						<li>Player 3: 80</li>
						{/* Add more leaderboard entries here */}
					</ul>
				</div>
			</div>
		</div>
	);
};
