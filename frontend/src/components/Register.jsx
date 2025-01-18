import React, { useState, useRef } from 'react';
import './styling/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { postRegister } from '../redux/actionCreators/thunks/login.ts';
import { useDispatch } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';

export const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [recaptchaToken, setRecaptchaToken] = useState(null);
	const recaptchaRef = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleBackClick = () => {
		navigate(-1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(postRegister(username, password, confirmPassword, email, recaptchaToken, recaptchaRef, navigate));
	};

	const handleRecaptchaChange = (token) => {
		setRecaptchaToken(token);
	};

	return (
		<div className="register-container">
			<button onClick={handleBackClick} className="snake-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</button>
			<h2>Register</h2>
			<form onSubmit={handleSubmit} className="register-form">
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username (length < 20)"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email*</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email (optional)"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password (length > 6)"
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
				<ReCAPTCHA ref={recaptchaRef} sitekey="6Lct0rsqAAAAAJYlt--4RL4fKaa2r_FDgKs8zs7R" onChange={handleRecaptchaChange} />
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
