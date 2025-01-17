import React, { useState } from 'react';
import './styling/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

export const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1); // Navigate to the previous page
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!username || !email || !password || !confirmPassword) {
			setError('All fields are required.');
			setSuccess('');
			return;
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			setSuccess('');
			return;
		}

		setError('');
		setSuccess('Registration successful!');
		console.log('Registered with:', { username, email, password });
		// Handle registration logic here (e.g., API call)
	};

	return (
		<div className="register-container">
			<button onClick={handleBackClick} className="snake-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</button>
			<h2>Register</h2>
			<form onSubmit={handleSubmit} className="register-form">
				{error && <p className="error-message">{error}</p>}
				{success && <p className="success-message">{success}</p>}
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
					<label htmlFor="email">Email*</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
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
				<div className="form-group">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm your password"
					/>
				</div>
				<button type="submit" className="register-button">
					Register
				</button>
			</form>
			<p>*Email is optional but if you want to recover the account, it is needed.</p>
			<Link to="/login" className="login-link">
				Already have an account? Login
			</Link>
		</div>
	);
};
