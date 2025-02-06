import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { updateUsername, updateEmail, updatePassword, removeEmail, removeUser } from '../redux/thunks/user.ts';
import { validateUsername, validateEmail, validatePasswordUpdate } from '../redux/thunks/validator.ts';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, InputAdornment } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog.jsx';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './styling/Profile.css';

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
	const [openConfirmEmailDeleteDialog, setOpenConfirmEmailDeleteDialog] = useState(false);
	const [openConfirmEmailDialog, setOpenConfirmEmailDialog] = useState(false);
	const [openConfirmPasswordDialog, setOpenConfirmPasswordDialog] = useState(false);
	const [openConfirmUsernameDialog, setOpenConfirmUsernameDialog] = useState(false);
	const [openConfirmUserDeleteDialog, setOpenConfirmUserDeleteDialog] = useState(false);

	useEffect(() => {
		if (!loading) {
			setNewUsername(username);
			setNewEmail(email || '-');
		}
	}, [loading, username, email]);

	const handleUsernameSubmit = async (e) => {
		e.preventDefault();
		handleCloseConfirmUsernameDialog();
		if (validateUsername(dispatch, username, newUsername, confirmNewUsername)) {
			const success = await dispatch(updateUsername(userId, newUsername));
			if (success) {
				setIsEditingUsername(false);
			}
		}
	};

	const handleEmailSubmit = async (e) => {
		e.preventDefault();
		handleCloseConfirmEmailDialog();
		if (validateEmail(dispatch, email, newEmail)) {
			const success = await dispatch(updateEmail(userId, newEmail));
			if (success) {
				setIsEditingEmail(false);
			};
		}
	};

	const handleEmailRemove = () => {
		handleCloseConfirmEmailDeleteDialog();
		dispatch(removeEmail(userId)).then(() => {
			setIsEditingEmail(false);
		});
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		handleCloseConfirmPasswordDialog();
		if (validatePasswordUpdate(dispatch, currentPassword, newPassword, confirmNewPassword)) {
			const success = await dispatch(updatePassword(userId, currentPassword, newPassword));
			if (success) {
				handleCancelPassword();
			}
		}
	};

	const handleUserDeleteSubmit = () => {
		handleCloseConfirmUserDeleteDialog();
		dispatch(removeUser(userId)).then(() => {
			navigate('/');
		});
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

	const handleOpenConfirmEmailDialog = (e) => {
		e.preventDefault();
		setOpenConfirmEmailDialog(true);
	};

	const handleCloseConfirmEmailDialog = () => {
		setOpenConfirmEmailDialog(false);
	};

	const handleOpenConfirmEmailDeleteDialog = () => {
		setOpenConfirmEmailDeleteDialog(true);
	};

	const handleCloseConfirmEmailDeleteDialog = () => {
		setOpenConfirmEmailDeleteDialog(false);
	};

	const handleOpenConfirmUsernameDialog = (e) => {
		e.preventDefault();
		setOpenConfirmUsernameDialog(true);
	};

	const handleCloseConfirmUsernameDialog = () => {
		setOpenConfirmUsernameDialog(false);
	};

	const handleOpenConfirmPasswordDialog = (e) => {
		e.preventDefault();
		setOpenConfirmPasswordDialog(true);
	};

	const handleCloseConfirmPasswordDialog = () => {
		setOpenConfirmPasswordDialog(false);
	};

	const handleOpenConfirmUserDeleteDialog = (e) => {
		e.preventDefault();
		setOpenConfirmUserDeleteDialog(true);
	};

	const handleCloseConfirmUserDeleteDialog = () => {
		setOpenConfirmUserDeleteDialog(false);
	};

	return (
		<div className="profile-container">
			<Link to={'/'} className="login-back-button">
				<FontAwesomeIcon icon={faArrowCircleLeft} size="2x" />
			</Link>
			<h2>Edit Profile</h2>
			<div className="profile-detail">
				<h3>Username</h3>
				{isEditingUsername ? (
					<form onSubmit={handleOpenConfirmUsernameDialog} className="profile-form">
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
					<form onSubmit={handleOpenConfirmEmailDialog} className="profile-form">
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
						<button
							type="button"
							disabled={email === null}
							className="profile-button remove-button"
							onClick={handleOpenConfirmEmailDeleteDialog}
						>
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
					<form onSubmit={handleOpenConfirmPasswordDialog} className="profile-form">
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
													label={showCurrentPassword ? 'hide the password' : 'display the password'}
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
													label={showNewPassword ? 'hide the password' : 'display the password'}
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
													label={showConfirmNewPassword ? 'hide the password' : 'display the password'}
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
							Update
						</button>
					</div>
				)}
				<div className="profile-detail">
					<h3>Delete account</h3>
					<button type="button" className="profile-button delete-button" onClick={handleOpenConfirmUserDeleteDialog}>
						Delete
					</button>
				</div>
			</div>
			<ConfirmationDialog
				open={openConfirmEmailDeleteDialog}
				onClose={handleCloseConfirmEmailDeleteDialog}
				onConfirm={handleEmailRemove}
				title="Confirm Email Removal"
				description="Are you sure you want to remove your email?"
			/>
			<ConfirmationDialog
				open={openConfirmEmailDialog}
				onClose={handleCloseConfirmEmailDialog}
				onConfirm={handleEmailSubmit}
				title="Confirm Email change"
				description="Are you sure you want to change your email?"
			/>
			<ConfirmationDialog
				open={openConfirmPasswordDialog}
				onClose={handleCloseConfirmPasswordDialog}
				onConfirm={handlePasswordSubmit}
				title="Confirm Password Change"
				description="Are you sure you want to change your password?"
			/>
			<ConfirmationDialog
				open={openConfirmUsernameDialog}
				onClose={handleCloseConfirmUsernameDialog}
				onConfirm={handleUsernameSubmit}
				title="Confirm Username Change"
				description="Are you sure you want to change your username? You will login with your new username."
			/>
			<ConfirmationDialog
				open={openConfirmUserDeleteDialog}
				onClose={handleCloseConfirmUserDeleteDialog}
				onConfirm={handleUserDeleteSubmit}
				title="Confirm User Deletion"
				description="Are you sure you want to delete your account? Your user data will be deleted."
			/>
		</div>
	);
};

export default Profile;
