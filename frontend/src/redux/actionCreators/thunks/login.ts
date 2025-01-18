import { createNotification } from '../notificationActions.ts';
import { Dispatch } from 'redux';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess, logout } from '../loginActions.ts';

const emailRegex = '^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$';

export const checkLogin = () => async (dispatch: Dispatch) => {
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
			const decoded: { username: string; role: string } = jwtDecode(data.accessToken);
			dispatch(loginSuccess({ user: decoded.username, role: decoded.role }));
		} else {
			dispatch(logout());
		}
	} catch (error) {
		console.log('Login check error: ', error.message);
	}
};

export const postLogin =
	(username: string, password: string, navigate: Function) => async (dispatch: Dispatch) => {
		const valid = await checkLoginInput(username, password)(dispatch);
		if (!valid) return;
		dispatch(createNotification('login', `Logging in...`, 'loading'));
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
				const decoded: { username: string; role: string } = jwtDecode(data.accessToken);
				dispatch(loginSuccess({ user: decoded.username, role: decoded.role }));
				dispatch(createNotification('login', `Welcome, ${decoded.username}!`, 'success'));
				navigate(-1);
			} else {
				console.log('Login fail: ', data.message);
				dispatch(createNotification('login', `${data.message}`, 'error'));
			}
		} catch (error) {
			dispatch(
				createNotification('register', `Error during login: ${error.message}`, 'error')
			);
		}
	};

export const postLogout = () => async (dispatch: Dispatch) => {
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
	(
		username: string,
		password: string,
		confirmPassword: string,
		email: string,
		navigate: Function
	) =>
	async (dispatch: Dispatch) => {
		const valid = await checkRegisterInput(
			username,
			password,
			confirmPassword,
			email
		)(dispatch);
		if (!valid) return;
		try {
			const response = await fetch('/api/login/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password, email }),
				credentials: 'include',
			});
			const data = await response.json();
			if (response.ok) {
				dispatch(createNotification('register', 'Registration successful', 'success'));
				navigate('/login');
			} else {
				console.log('Login fail: ', data.message);
				dispatch(createNotification('register', `${data.message}`, 'error'));
			}
		} catch (error) {
			dispatch(
				createNotification(
					'register',
					`Error during registration: ${error.message}`,
					'error'
				)
			);
		}
	};

const checkRegisterInput =
	(username: string, password: string, confirmPassword: string, email: string) =>
	async (dispatch: Dispatch) => {
		if (!username || !password || !confirmPassword) {
			dispatch(createNotification('register', 'Please enter required fields', 'error'));
			return false;
		}
		if (confirmPassword !== password) {
			dispatch(createNotification('register', 'Passwords do not match', 'error'));
			return false;
		}
		if (password.length < 6) {
			dispatch(
				createNotification(
					'register',
					'Password is not long enough (< 6 characters)',
					'error'
				)
			);
			return false;
		}
		if (email && !email.match(emailRegex)) {
			return false;
		}
		return true;
	};

const checkLoginInput = (username: string, password: string) => async (dispatch: Dispatch) => {
	if (!username || !password) {
		dispatch(createNotification('login', 'Please enter required fields', 'error'));
		return false;
	}
	if (password.length < 6) {
		dispatch(
			createNotification('register', 'Password is not long enough (< 6 characters)', 'error')
		);
		return false;
	}
	return true;
};
