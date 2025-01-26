import React, { useState } from 'react';
import './styling/Login.css';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link } from 'react-router-dom';
import { postLogin } from '../redux/actionCreators/thunks/login.ts';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment } from '@mui/material';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);

	const handleBackClick = () => {
		navigate(-1); // Navigate to the previous page
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(postLogin(username, password, navigate));
	};

	return (
		<div className="login-container">
			<Link onClick={handleBackClick} className="login-back-button"> 
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</Link>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className="login-form">
				<div className="form-group">
					<label htmlFor="login-username">Username</label>
					<TextField
						id="login-username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
						variant="outlined"
						fullWidth
					/>
				</div>
				<div className="form-group">
					<label htmlFor="login-password">Password</label>
					<TextField
						id="login-password"
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
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
				<button type="submit" className="login-button">
					Login
				</button>
			</form>
			<Link to="/register" className="register-link">
				Haven't registered yet? Register
			</Link>
		</div>
	);
};
