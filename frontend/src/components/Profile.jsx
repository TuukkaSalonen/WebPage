import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUsername, updateEmail, updatePassword } from '../redux/actionCreators/userActions.ts';
import { validateUsername, validateEmail, validatePassword } from '../redux/actionCreators/validator.ts';
import './styling/Profile.css';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.id);
	const username = useSelector((state) => state.auth.username);
	const email = useSelector((state) => state.auth.email);
	const loading = useSelector((state) => state.auth.loading);

	const [newUsername, setNewUsername] = useState('');
	const [confirmNewUsername, setConfirmNewUsername] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [isEditingUsername, setIsEditingUsername] = useState(false);
	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [isEditingPassword, setIsEditingPassword] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

	useEffect(() => {
		if (!loading) {
			setNewUsername(username);
			setNewEmail(email || '-');
		}
	}, [loading, username, email]);

	const handleUsernameSubmit = (e) => {
		e.preventDefault();
		if (validateUsername(dispatch, username, newUsername, confirmNewUsername)) {
			dispatch(updateUsername(userId, newUsername)).then(() => {
				setIsEditingUsername(false);
			});
		}
	};

	const handleEmailSubmit = (e) => {
		e.preventDefault();
		if (validateEmail(dispatch, email, newEmail)) {
			dispatch(updateEmail(userId, newEmail)).then(() => {
				setIsEditingEmail(false);
			});
		}
	};

	const handleEmailRemove = (e) => {
		console.log('remove email');
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		if (validatePassword(dispatch, currentPassword, newPassword, confirmNewPassword)) {
			const success = await dispatch(updatePassword(userId, currentPassword, newPassword));
			if (success) {
				handleCancelPassword();
			}
		}
	};

	const handleCancelUsername = () => {
		setNewUsername(username);
		setConfirmNewUsername('');
		setIsEditingUsername(false);
	};

	const handleCancelEmail = () => {
		setNewEmail(email || '-');
		setIsEditingEmail(false);
	};

	const handleCancelPassword = () => {
		setCurrentPassword('');
		setNewPassword('');
		setConfirmNewPassword('');
		setIsEditingPassword(false);
	};

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<div className="profile-container">
			<button onClick={handleBackClick} className="snake-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</button>
			<h2>Edit Profile</h2>
			<div className="profile-detail">
				<h3>Username</h3>
				{isEditingUsername ? (
					<form onSubmit={handleUsernameSubmit} className="profile-form">
						<div className="form-group">
							<TextField
								type="text"
								id="username"
								value={newUsername}
								onChange={(e) => setNewUsername(e.target.value)}
								placeholder="Enter your new username"
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className="form-group">
							<TextField
								type="text"
								id="confirmNewUsername"
								value={confirmNewUsername}
								onChange={(e) => setConfirmNewUsername(e.target.value)}
								placeholder="Confirm your new username"
								variant="outlined"
								fullWidth
							/>
						</div>
						<p className="warning-text">Changing your username will change the username you login with!</p>
						<button type="submit" className="profile-button save-button">
							Save
						</button>
						<button type="button" className="profile-button cancel-button" onClick={handleCancelUsername}>
							Cancel
						</button>
					</form>
				) : (
					<div className="profile-info">
						<p>{username}</p>
						<button type="button" className="profile-button" onClick={() => setIsEditingUsername(true)}>
							Update
						</button>
					</div>
				)}
			</div>
			<div className="profile-detail">
				<h3>Email</h3>
				{isEditingEmail ? (
					<form onSubmit={handleEmailSubmit} className="profile-form">
						<div className="form-group">
							<TextField
								type="email"
								id="email"
								value={newEmail}
								onChange={(e) => setNewEmail(e.target.value)}
								placeholder="Enter your email"
								variant="outlined"
								fullWidth
							/>
						</div>
						<button type="submit" className="profile-button save-button">
							Save
						</button>
						<button type="button" className="profile-button remove-button" onClick={handleEmailRemove}>
							Remove email
						</button>
						<button type="button" className="profile-button cancel-button" onClick={handleCancelEmail}>
							Cancel
						</button>
					</form>
				) : (
					<div className="profile-info">
						<p>{email || '-'}</p>
						<button type="button" className="profile-button" onClick={() => setIsEditingEmail(true)}>
							Update
						</button>
					</div>
				)}
			</div>
			<div className="profile-detail">
				<h3>Password</h3>
				{isEditingPassword ? (
					<form onSubmit={handlePasswordSubmit} className="profile-form">
						<div className="form-group">
							<TextField
								type={showCurrentPassword ? 'text' : 'password'}
								id="currentPassword"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								placeholder="Enter your current password"
								variant="outlined"
								fullWidth
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label={showCurrentPassword ? 'hide the password' : 'display the password'}
													onClick={() => setShowCurrentPassword(!showCurrentPassword)}
												>
													{showCurrentPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										),
									},
								}}
							/>
						</div>
						<div className="form-group">
							<TextField
								type={showNewPassword ? 'text' : 'password'}
								id="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								placeholder="Enter your new password"
								variant="outlined"
								fullWidth
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label={showNewPassword ? 'hide the password' : 'display the password'}
													onClick={() => setShowNewPassword(!showNewPassword)}
												>
													{showNewPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										),
									},
								}}
							/>
						</div>
						<div className="form-group">
							<TextField
								type={showConfirmNewPassword ? 'text' : 'password'}
								id="confirmNewPassword"
								value={confirmNewPassword}
								onChange={(e) => setConfirmNewPassword(e.target.value)}
								placeholder="Confirm your new password"
								variant="outlined"
								fullWidth
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label={showConfirmNewPassword ? 'hide the password' : 'display the password'}
													onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
												>
													{showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										),
									},
								}}
							/>
						</div>
						{/* <label className="show-password-label">
                            <input type="checkbox" id="showPassword" onChange={() => setShowPasswordInput(!showPasswordInput)} /> Show password input
                        </label> */}
						<button type="submit" className="profile-button save-button">
							Save
						</button>
						<button type="button" className="profile-button cancel-button" onClick={handleCancelPassword}>
							Cancel
						</button>
					</form>
				) : (
					<div className="password-update-container">
						<button type="button" className="profile-button" onClick={() => setIsEditingPassword(true)}>
							Update Password
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
