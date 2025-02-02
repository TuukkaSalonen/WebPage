import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment } from '@mui/material';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { sendRegister } from '../redux/thunks/login.ts';
import { useDispatch } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import './styling/Register.css';

export const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [recaptchaToken, setRecaptchaToken] = useState(null);
	const recaptchaRef = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleBackClick = () => {
		navigate(-1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(sendRegister(username, password, confirmPassword, email, recaptchaToken, recaptchaRef, navigate));
	};

	const handleRecaptchaChange = (token) => {
		setRecaptchaToken(token);
	};

	return (
		<div className="register-container">
			<Link onClick={handleBackClick} className="login-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</Link>
			<h2>Register</h2>
			<form onSubmit={handleSubmit} className="register-form">
				<div className="form-group">
					<label htmlFor="register-username">Username</label>
					<TextField
						id="register-username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter username (length < 20)"
						variant="outlined"
						fullWidth
					/>
				</div>
				<div className="form-group">
					<label htmlFor="register-email">Email (optional*)</label>
					<TextField
						id="register-email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter email (optional)"
						variant="outlined"
						fullWidth
					/>
				</div>
				<div className="form-group">
					<label htmlFor="register-password">Password</label>
					<TextField
						id="register-password"
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter password (length > 6)"
						variant="outlined"
						fullWidth
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											label={showPassword ? 'hide the password' : 'display the password'}
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="register-password-confirm">Confirm Password</label>
					<TextField
						id="register-password-confirm"
						type={showConfirmPassword ? 'text' : 'password'}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm password"
						variant="outlined"
						fullWidth
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											label={showPassword ? 'hide the password' : 'display the password'}
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										>
											{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
				</div>
				<div className="recaptcha-container">
                    <ReCAPTCHA ref={recaptchaRef} sitekey="6Lct0rsqAAAAAJYlt--4RL4fKaa2r_FDgKs8zs7R" onChange={handleRecaptchaChange} />
                </div>
				<button type="submit" className="register-button">
					Register
				</button>
			</form>
			<p>*Email is is required to reset password if forgotten.</p>
			<Link to="/login" className="login-link">
				Registered already? Login
			</Link>
		</div>
	);
};
