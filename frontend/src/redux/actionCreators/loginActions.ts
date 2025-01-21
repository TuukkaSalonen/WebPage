import { SET_AUTH, REMOVE_AUTH, UPDATE_USERNAME, UPDATE_EMAIL, LOGIN_LOADING } from './actionConstants.ts';

export const loginSuccess = (user: Object) => ({
	type: SET_AUTH,
	payload: user,
});

export const loginLoading = () => ({
	type: LOGIN_LOADING,
});

export const updateLoginUsername = (username: string) => ({
	type: UPDATE_USERNAME,
	payload: { username },
});

export const updateLoginEmail = (email: string) => ({
	type: UPDATE_EMAIL,
	payload: { email },
});

export const logout = () => ({
	type: REMOVE_AUTH,
});