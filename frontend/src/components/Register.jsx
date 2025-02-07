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
	const recaptchaRef = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleBackClick = () => {
		navigate(-1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const recaptchaValue = recaptchaRef.current?.getValue();
		dispatch(sendRegister(username, password, confirmPassword, email, recaptchaValue, recaptchaRef, navigate));
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
						autoComplete='username'
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
						autoComplete='email'
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
						autoComplete='new-password'
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
						autoComplete='new-password'
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
                    <ReCAPTCHA ref={recaptchaRef} sitekey="6Lct0rsqAAAAAJYlt--4RL4fKaa2r_FDgKs8zs7R" />
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
