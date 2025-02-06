import { Dispatch } from 'redux';
import { createNotification } from '../actionCreators/notificationActions.ts';

export const emailRegex = '^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$';

// Validate reset password email input
export const validateResetEmail = (email: string) => async (dispatch: Dispatch) => {
	if (!email || !email.match(emailRegex)) {
		dispatch(createNotification('reset-password', 'Invalid email!', 'error'));
		return false;
	}
	return true;
};

// Validate email update input
export const validateEmail = (dispatch: Dispatch, email: string, newEmail: string): boolean => {
	if (!newEmail || newEmail.trim().length < 1) {
		dispatch(createNotification('profile', 'Email field required!', 'error'));
		return false;
	}
	if (newEmail === email) {
		dispatch(createNotification('profile', 'This is already your email!', 'error'));
		return false;
	}
	if (!newEmail.match(emailRegex)) {
		dispatch(createNotification('profile', 'Invalid email!', 'error'));
		return false;
	}
	return true;
};

// Validate username update input
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

// Validate password reset input
export const validatePasswords = (password: string, confirmPassword: string) => async (dispatch: Dispatch) => {
	if (!password || !confirmPassword) {
		dispatch(createNotification('reset-password', 'Password fields are required!', 'error'));
		return false;
	}
	if (confirmPassword.trim().length < 6 || password.trim().length < 6) {
		dispatch(createNotification('reset-password', 'Passwords are too short! (< 6 characters)', 'error'));
		return false;
	}

	if (password !== confirmPassword) {
		dispatch(createNotification('reset-password', 'Passwords do not match!', 'error'));
		return false;
	}
	return true;
};

// Validate password update input
export const validatePasswordUpdate = (dispatch: Dispatch, currentPassword: string, newPassword: string, confirmNewPassword: string): boolean => {
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

// Validate register input
export const checkRegisterInput =
	(username: string, password: string, confirmPassword: string, email: string, recaptchaToken: string) => async (dispatch: Dispatch) => {
		if (!username || !password || !confirmPassword) {
			dispatch(createNotification('register', 'Please enter the required fields!', 'error'));
			return false;
		}
		if (confirmPassword !== password) {
			dispatch(createNotification('register', 'Passwords do not match!', 'error'));
			return false;
		}
		if (password.length < 6) {
			dispatch(createNotification('register', 'Password is not long enough! (< 6 characters)', 'error'));
			return false;
		}
		if (username.length > 20) {
			dispatch(createNotification('register', 'Username is too long! (> 20 characters)', 'error'));
			return false;
		}
		if (email && !email.match(emailRegex)) {
			dispatch(createNotification('register', 'Invalid email!', 'error'));
			return false;
		}
		if (!recaptchaToken) {
			dispatch(createNotification('register', 'Please complete the reCAPTCHA!', 'error'));
			return false;
		}
		return true;
	};

// Validate login input
export const checkLoginInput = (username: string, password: string) => async (dispatch: Dispatch) => {
	if (!username || !password) {
		dispatch(createNotification('login', 'Please enter the required fields!', 'error'));
		return false;
	}
	if (password.length < 6) {
		dispatch(createNotification('login', 'Password is not long enough! (< 6 characters)', 'error'));
		return false;
	}
	return true;
};
