import { Dispatch } from 'redux';
import { createNotification } from './notificationActions.ts';
import { putEmail, putPassword, putUsername, deleteEmail, deleteUser } from './thunks/user.ts';
import { removeLoginEmail, updateLoginEmail, updateLoginUsername } from './loginActions.ts';
import { RootState } from '../store.js';
import { ADMIN_ROLE } from './actionConstants.ts';
import { postLogout } from './thunks/login.ts';

export const updateUsername = (id: string, username: string) => async (dispatch: Dispatch, getState: () => RootState) => {
	try {
		dispatch(createNotification('user', 'Updating username', 'loading'));
		const response = await putUsername(id, username);
		const  { role, id: currentUserId } = getState().auth;
		if (role !== ADMIN_ROLE && currentUserId === id) {
			dispatch(updateLoginUsername(response));
		}
		dispatch(createNotification('user', 'Username updated successfully', 'success'));
	} catch (error) {
		dispatch(createNotification('user', `${error.message}`, 'error'));
	}
};

export const updateEmail = (id: string, email: string) => async (dispatch: Dispatch, getState: () => RootState) => {
	try {
		dispatch(createNotification('user', 'Updating email', 'loading'));
		const response = await putEmail(id, email);
		const  { role, id: currentUserId } = getState().auth;
		if (role !== ADMIN_ROLE && currentUserId === id) {
			dispatch(updateLoginEmail(response));
		}
		dispatch(createNotification('user', 'Email updated successfully', 'success'));
	} catch (error) {
		dispatch(createNotification('user', `${error.message}`, 'error'));
	}
};

export const updatePassword =
	(id: string, oldPassword: string, newPassword: string) =>
	async (dispatch: Dispatch): Promise<boolean> => {
		try {
			dispatch(createNotification('user', 'Updating password', 'loading'));
			await putPassword(id, oldPassword, newPassword);
			dispatch(createNotification('user', 'Password updated successfully', 'success'));
			return true;
		} catch (error) {
			dispatch(createNotification('user', `${error.message}`, 'error'));
			return false;
		}
	};

export const removeEmail =
	(id: string) =>
	async (dispatch: Dispatch, getState: () => RootState): Promise<boolean> => {
		try {
			dispatch(createNotification('user', 'Deleting email', 'loading'));
			await deleteEmail(id);
			const  { role, id: currentUserId } = getState().auth;
			if (role !== ADMIN_ROLE && currentUserId === id) {
				dispatch(removeLoginEmail());
			}
			dispatch(createNotification('user', 'Email deleted successfully', 'success'));
			return true;
		} catch (error) {
			dispatch(createNotification('user', `${error.message}`, 'error'));
			return false;
		}
	};

export const removeUser =
	(id: string) =>
	async (dispatch: Dispatch, getState: () => RootState): Promise<boolean> => {
		try {
			dispatch(createNotification('user', 'Deleting user', 'loading'));
			await deleteUser(id);
			const  { role, id: currentUserId } = getState().auth;
			if (role !== ADMIN_ROLE && currentUserId === id) {
				dispatch(postLogout() as any);
			}
			dispatch(createNotification('user', 'User deleted successfully', 'success'));
			return true;
		} catch (error) {
			dispatch(createNotification('user', `${error.message}`, 'error'));
			return false;
		}
	};
