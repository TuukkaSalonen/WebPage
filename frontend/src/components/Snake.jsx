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

import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { fetchScores, sendScore } from '../redux/actionCreators/snakeActions.ts';

export const Snake = () => {
	const dispatch = useDispatch();
	const leaderboard = useSelector((state) => state.snake.scores);
	const loading = useSelector((state) => state.snake.loading);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	const scoreRef = useRef(score);
	const highScoreRef = useRef(highScore);
	const gameOverRef = useRef(false);
	const intervalIdRef = useRef(null);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			dispatch(fetchScores());
			setHighScore(localStorage.getItem('high-score') || 0);
		};
		fetchLeaderboard();
	}, [dispatch]);

	useEffect(() => {
		const playBoard = document.querySelector('.play-board');
		const controls = document.querySelectorAll('.controls i');

		let foodX, foodY;
		let snakeX = 5,
			snakeY = 5;
		let velocityX = 0,
			velocityY = 0;
		let snakeBody = [];

		const updateFoodPosition = () => {
			// Passing a random 1 - 30 value as food position
			foodX = Math.floor(Math.random() * 30) + 1;
			foodY = Math.floor(Math.random() * 30) + 1;
		};

		const handleGameOver = async () => {
			// Clearing the timer and reloading the page on game over
			//clearInterval(setIntervalId);
			clearInterval(intervalIdRef.current);
			alert('Game Over! Press OK to replay...');
			dispatch(sendScore(scoreRef.current));
			//window.location.reload();
			resetGame();
		};

		const resetButtons = () => {
			controls.forEach((button) => button.classList.remove('arrow-active'));
		};

		const resetGame = () => {
			clearInterval(intervalIdRef.current);
			setScore(0);
			scoreRef.current = 0;
			gameOverRef.current = false;
			snakeX = 5;
			snakeY = 5;
			velocityX = 0;
			velocityY = 0;
			snakeBody = [];
			updateFoodPosition();
			intervalIdRef.current = setInterval(initGame, 100);
			resetButtons();
		};

		const changeDirection = (e) => {
			const key = e.key || e;

			resetButtons();

			// Find the button corresponding to the pressed key and add the active class
			const activeButton = Array.from(controls).find((button) => button.dataset.key === key);
			if (activeButton) {
				activeButton.classList.add('arrow-active');
			}

			// Changing velocity value based on key press
			if (key === 'ArrowUp' && velocityY !== 1) {
				velocityX = 0;
				velocityY = -1;
			} else if (key === 'ArrowDown' && velocityY !== -1) {
				velocityX = 0;
				velocityY = 1;
			} else if (key === 'ArrowLeft' && velocityX !== 1) {
				velocityX = -1;
				velocityY = 0;
			} else if (key === 'ArrowRight' && velocityX !== -1) {
				velocityX = 1;
				velocityY = 0;
			}
		};

		// Calling changeDirection on each key click and passing key dataset value as an object
		controls.forEach((button) =>
			button.addEventListener('click', () => changeDirection({ key: button.dataset.key }))
		);

		const initGame = () => {
			if (gameOverRef.current) return handleGameOver();
			let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

			// Checking if the snake hit the food
			if (snakeX === foodX && snakeY === foodY) {
				updateFoodPosition();
				snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
				setScore((prevScore) => {
					const newScore = prevScore + 1;
					scoreRef.current = newScore;
					if (newScore > highScoreRef.current) {
						localStorage.setItem('high-score', newScore);
						setHighScore(newScore);
						highScoreRef.current = newScore;
					}
					return newScore;
				});
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
				return (gameOverRef.current = true);
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
					gameOverRef.current = true;
				}
			}
			playBoard.innerHTML = html;
		};

		updateFoodPosition();
		intervalIdRef.current = setInterval(initGame, 100);
		document.addEventListener('keyup', changeDirection);

		const preventArrowScroll = (e) => {
			if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
				e.preventDefault();
			}
		};
		window.addEventListener('keydown', preventArrowScroll);

		return () => {
			clearInterval(intervalIdRef.current);
			document.removeEventListener('keyup', changeDirection);
			window.removeEventListener('keydown', preventArrowScroll);
		};
	}, [dispatch]);

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
						<span className="score">Score: {score}</span>
						<span className="high-score">High Score: {highScore}</span>
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
					<div className="leaderboard-header">
						<span>Place</span>
						<span>Name</span>
						<span>Score</span>
					</div>
					<ul>
						{loading ? (
							<li className="scorePlaceholder">Loading...</li>
						) : leaderboard && leaderboard.length === 0 ? (
							<li className="scorePlaceholder">No scores yet!</li>
						) : (
							leaderboard.map((entry, index) => (
								<li key={index}>
									<span>{index + 1}.</span>
									<span>{entry.name}</span>
									<span>{entry.score}</span>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};
