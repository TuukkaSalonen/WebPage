import { createNotification } from '../actionCreators/notificationActions.ts';
import { Dispatch } from 'redux';
import { loginLoading, loginSuccess, logout } from '../actionCreators/loginActions.ts';
import { getLogin, getProfile, postLogin, postLogout, postRegister } from '../API/loginAPI.ts';
import { checkLoginInput, checkRegisterInput } from './validator.ts';
import { LoginResponse } from '../interfaces.ts';

// Thunk to check if user is logged in and fetch profile if so 
export const checkLogin = () => async (dispatch: Dispatch) => {
	try {
		const loggedIn = await getLogin();
		if (!loggedIn) {
			dispatch(logout());
			return;
		}
		const profile = await getProfile();
		if (profile) {
			dispatch(loginSuccess(profile));
		} else {
			dispatch(logout());
		}
	} catch (error) {
		dispatch(logout()); // Clear user state even if server error
		//console.log('Login check error: ', error.message);
	}
};

// Thunk to send login request
export const sendLogin = (username: string, password: string, navigate: Function) => async (dispatch: Dispatch) => {
	dispatch(loginLoading());
	if (!(await checkLoginInput(username, password)(dispatch))) return;
	dispatch(createNotification('login', `Logging in`, 'loading'));
	try {
		const loginResponse: LoginResponse = await postLogin(username, password);
		if (loginResponse.status === true) {
			const profileResponse = await getProfile();
			if (profileResponse) {
				dispatch(loginSuccess(profileResponse));
				dispatch(createNotification('login', `Welcome, ${profileResponse.username}!`, 'success'));
				navigate(-1);
			}
			else {
				dispatch(createNotification('login', 'Error during login!', 'error'));
				dispatch(logout());
			}
		} else {
			dispatch(createNotification('login', `${loginResponse.message}`, 'error'));
			dispatch(logout());
		}
	} catch (error) {
		dispatch(logout()); // Clear user state even if server error
		dispatch(createNotification('login', `Error during login: ${error.message}`, 'error'));
	}
};

// Thunk to send logout request
export const sendLogout = () => async (dispatch: Dispatch) => {
	dispatch(loginLoading());
	dispatch(createNotification('login', 'Logging out', 'loading'));
	try {
		const logoutSuccess = await postLogout();
		if (logoutSuccess) {
			dispatch(logout());
			dispatch(createNotification('login', 'Logged out successfully', 'success'));
		} else {
			dispatch(createNotification('login', 'Error during log out', 'error'));
			dispatch(logout()); // Log user out locally even if server error
		}
	} catch (error) {
		dispatch(logout()); // Clear user state even if server error
		dispatch(createNotification('login', `Internal server error`, 'error'));
	}
};

// Thunk to send register request
export const sendRegister =
	(username: string, password: string, confirmPassword: string, email: string, recaptchaToken: string, recaptchaRef: any, navigate: Function) =>
	async (dispatch: Dispatch) => {
		const validInput = await checkRegisterInput(username, password, confirmPassword, email, recaptchaToken)(dispatch);
		if (!validInput) {
			recaptchaRef.current.reset();
			return;
		}
		dispatch(createNotification('register', `Registering`, 'loading'));
		try {
			const registerResponse: LoginResponse = await postRegister(username, password, email, recaptchaToken);
			if (registerResponse.status === true) {
				dispatch(createNotification('register', 'Registration successful', 'success'));
				navigate('/login');
			} else {
				recaptchaRef.current.reset();
				dispatch(createNotification('register', `${registerResponse.message}`, 'error'));
			}
		} catch (error) {
			recaptchaRef.current.reset();
			dispatch(createNotification('register', `Error during registration: ${error.message}`, 'error'));
		}
	};
