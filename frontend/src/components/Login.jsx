import React, { useState } from 'react';
import './styling/Login.css';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../redux/actionCreators/thunks/login.ts';
import { useDispatch } from 'react-redux';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleBackClick = () => {
		navigate(-1); // Navigate to the previous page
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(postLogin(username, password, navigate));
	};

	return (
		<div className="login-container">
			<button onClick={handleBackClick} className="snake-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</button>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className="login-form">
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
