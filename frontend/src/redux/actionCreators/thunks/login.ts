import { createNotification } from '../notificationActions.ts';
import { Dispatch } from 'redux';
import { loginLoading, loginSuccess, logout } from '../loginActions.ts';

export const emailRegex = '^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$';

export const getLogin = () => async (dispatch: Dispatch) => {
	try {
		const response = await fetch('/api/login/check', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (response.ok) {
			if (!data.accessToken) {
				dispatch(logout());
				return;
			}
			const profileResponse = await fetch(`/api/login/profile`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			const userData = await profileResponse.json();
			if (profileResponse.ok && userData.message) {
				dispatch(loginSuccess(userData.message));
			} else {
				dispatch(logout());
			}
		} else {
			dispatch(logout());
		}
	} catch (error) {
		dispatch(logout()); // Clear user state even if server error
		console.log('Login check error: ', error.message);
	}
};

export const postLogin = (username: string, password: string, navigate: Function) => async (dispatch: Dispatch) => {
	dispatch(loginLoading());
	const valid = await checkLoginInput(username, password)(dispatch);
	if (!valid) return;
	dispatch(createNotification('login', `Logging in`, 'loading'));
	try {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
			credentials: 'include',
		});
		const data = await response.json();
		if (response.ok) {
			if (!data.accessToken) {
				dispatch(logout());
				return;
			}
			const profileResponse = await fetch(`/api/login/profile`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			const userData = await profileResponse.json();
			if (profileResponse.ok && userData.message) {
				const user = userData.message;
				dispatch(loginSuccess(user));
				dispatch(createNotification('login', `Welcome, ${user.username}!`, 'success'));
				navigate(-1);
			}
		} else {
			dispatch(createNotification('login', `${data.message}`, 'error'));
			dispatch(logout());
		}
	} catch (error) {
		dispatch(logout()); // Clear user state even if server error
		dispatch(createNotification('login', `Error during login: ${error.message}`, 'error'));
	}
};

export const postLogout = () => async (dispatch: Dispatch) => {
	dispatch(loginLoading());
	dispatch(createNotification('logout', 'Logging out', 'loading'));
	try {
		const response = await fetch('/api/login/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (response.ok) {
			dispatch(logout());
			dispatch(createNotification('logout', 'Logged out successfully', 'success'));
		} else {
			dispatch(createNotification('logout', `${data.message}`, 'error'));
		}
	} catch (error) {
		dispatch(logout()); // Clear user state even if server error
		dispatch(createNotification('logout', `Error during logout: ${error.message}`, 'error'));
	}
};

export const postRegister =
	(username: string, password: string, confirmPassword: string, email: string, recaptchaToken: string, recaptchaRef: any, navigate: Function) =>
	async (dispatch: Dispatch) => {
		const validInput = await checkRegisterInput(username, password, confirmPassword, email, recaptchaToken)(dispatch);
		if (!validInput) {
			recaptchaRef.current.reset();
			return;
		}
		dispatch(createNotification('register', `Registering`, 'loading'));
		try {
			const response = await fetch('/api/login/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password, email, recaptchaToken }),
				credentials: 'include',
			});
			const data = await response.json();
			if (response.ok) {
				dispatch(createNotification('register', 'Registration successful', 'success'));
				navigate('/login');
			} else {
				recaptchaRef.current.reset();
				dispatch(createNotification('register', `${data.message}`, 'error'));
			}
		} catch (error) {
			recaptchaRef.current.reset();
			dispatch(createNotification('register', `Error during registration: ${error.message}`, 'error'));
		}
	};

const checkRegisterInput =
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

const checkLoginInput = (username: string, password: string) => async (dispatch: Dispatch) => {
	if (!username || !password) {
		dispatch(createNotification('login', 'Please enter the required fields!', 'error'));
		return false;
	}
	if (password.length < 6) {
		dispatch(createNotification('register', 'Password is not long enough! (< 6 characters)', 'error'));
		return false;
	}
	return true;
};
