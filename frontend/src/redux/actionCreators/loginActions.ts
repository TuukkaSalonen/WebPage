import { SET_AUTH, REMOVE_AUTH } from './actionConstants.ts';

export const loginSuccess = (user: Object) => ({
	type: SET_AUTH,
	payload: user,
});

export const logout = () => ({
	type: REMOVE_AUTH,
});
