import { Dispatch } from 'redux';
import { createNotification } from './notificationActions.ts';
import { emailRegex } from './thunks/login.ts';

export const validateUsername = (dispatch: Dispatch, username: string, newUsername: string, confirmNewUsername: string): boolean => {
	if (!newUsername || !confirmNewUsername || newUsername.trim().length < 1 || confirmNewUsername.trim().length < 1) {
		dispatch(createNotification('profile', 'All username fields are required!', 'error'));
		return false;
	}
	if (newUsername.trim().length > 20) {
		dispatch(createNotification('profile', 'Username is too long! (> 20 characters)', 'error'));
		return false;
	}
	if (newUsername !== confirmNewUsername) {
		dispatch(createNotification('profile', 'Usernames do not match!', 'error'));
		return false;
	}
	if (newUsername === username) {
		dispatch(createNotification('profile', 'This is already your username!', 'error'));
		return false;
	}
	return true;
};

export const validateEmail = (dispatch: Dispatch, email: string, newEmail: string): boolean => {
	if (!newEmail || newEmail.trim().length < 1) {
		dispatch(createNotification('profile', 'Email is required!', 'error'));
		return false;
	}
	if (email === newEmail) {
		dispatch(createNotification('profile', 'This is already your email!', 'error'));
		return false;
	}
	if (!newEmail.match(emailRegex)) {
		dispatch(createNotification('profile', 'Invalid email!', 'error'));
		return false;
	}
	return true;
};

export const validatePassword = (dispatch: Dispatch, currentPassword: string, newPassword: string, confirmNewPassword: string): boolean => {
	if (
		!currentPassword ||
		!confirmNewPassword ||
		!newPassword ||
		currentPassword.trim().length < 1 ||
		confirmNewPassword.trim().length < 1 ||
		newPassword.trim().length < 1
	) {
		dispatch(createNotification('profile', 'All password fields are required!', 'error'));
		return false;
	}
	if (newPassword.length < 6) {
		dispatch(createNotification('profile', 'Password is too short! (< 6 characters)', 'error'));
		return false;
	}
	if (newPassword === currentPassword) {
		dispatch(createNotification('profile', 'New password is the same as the current password!', 'error'));
		return false;
	}
	if (newPassword !== confirmNewPassword) {
		dispatch(createNotification('profile', 'New passwords do not match!', 'error'));
		return false;
	}
	return true;
};
