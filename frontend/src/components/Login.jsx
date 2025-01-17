import React, { useState } from 'react';
import './styling/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1); // Navigate to the previous page
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (username === '' || password === '') {
			setError('Please fill in all fields.');
		} else {
			setError('');
			console.log('Logging in with:', { username, password });
			// Handle login logic here (e.g., API call)
		}
	};

	return (
		<div className="login-container">
			<button onClick={handleBackClick} className="snake-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</button>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className="login-form">
				{error && <p className="error-message">{error}</p>}
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
					/>
				</div>
				<button type="submit" className="login-button">
					Login
				</button>
			</form>
		</div>
	);
};
