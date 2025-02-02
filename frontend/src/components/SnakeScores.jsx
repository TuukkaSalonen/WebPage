import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserScores } from '../redux/thunks/snake.ts';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from './constants/utils.ts';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './styling/SnakeScores.css';

export const SnakeScores = () => {
	const dispatch = useDispatch();
	const username = useSelector((state) => state.auth.username);
	const [scores, setScores] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalGames, setTotalGames] = useState(0);
	const [averageScore, setAverageScore] = useState(0);
	const [highestScore, setHighestScore] = useState(0);
	const [lowestScore, setLowestScore] = useState(0);

	useEffect(() => {
		const fetchScores = async () => {
			const fetchedScores = await dispatch(fetchUserScores());
			setScores(fetchedScores);
			setLoading(false);

			const totalFetchedGames = fetchedScores.length;
			if (totalFetchedGames !== 0) {
				const totalScore = fetchedScores.reduce((acc, score) => acc + score.score, 0);
				const averageScore = totalFetchedGames > 0 ? (totalScore / totalFetchedGames).toFixed(2) : 0;
				const highestScore = fetchedScores.length > 0 ? Math.max(...fetchedScores.map((score) => score.score)) : 0;
				const lowestScore = fetchedScores.length > 0 ? Math.min(...fetchedScores.map((score) => score.score)) : 0;
				setAverageScore(averageScore);
				setHighestScore(highestScore);
				setLowestScore(lowestScore);
			}
			setTotalGames(totalFetchedGames);
		};
		fetchScores();
	}, [dispatch]);

	return (
		<div className="snake-scores-container">
			<Link to={'/'} className="login-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</Link>
			<h2>Your Snake Game Scores</h2>
			<h3>{username}</h3>
			{loading ? (
				<div className="user-scores-loading-container">
					<CircularProgress size={30} />
				</div>
			) : totalGames === 0 ? (
				<div className="no-scores">
					<h3>No scores yet!</h3>
				</div>
			) : (
				<div className="content-container">
					<div className="statistics-container">
						<h4>Statistics</h4>
						<div className="statistics">
							<div className="statistics-item">
								<p>Total Games Played:</p>
								<p>{totalGames}</p>
							</div>
							<div className="statistics-item">
								<p>Average Score:</p>
								<p>{averageScore}</p>
							</div>
							<div className="statistics-item">
								<p>Highest Score:</p>
								<p>{highestScore}</p>
							</div>
							<div className="statistics-item">
								<p>Lowest Score:</p>
								<p>{lowestScore}</p>
							</div>
						</div>
					</div>
					<div className="scores-container">
						<h4>Top 25 Scores</h4>
						<TableContainer component={Paper} className="table-container">
							<Table className="scores-table" size="small" aria-label="snake scores table">
								<TableHead>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Date played</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{scores.map((score, index) => (
										<TableRow key={index} className="score-item">
											<TableCell>{index + 1}</TableCell>
											<TableCell>{score.rank}</TableCell>
											<TableCell>{score.score}</TableCell>
											<TableCell>{formatDate(score.created_at)}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			)}
		</div>
	);
};

export default SnakeScores;
