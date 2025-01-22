import { Dispatch } from 'redux';
import { createNotification } from './notificationActions.ts';
import { putEmail, putPassword, putUsername, deleteEmail } from './thunks/user.ts';
import { removeLoginEmail, updateLoginEmail, updateLoginUsername } from './loginActions.ts';

export const updateUsername = (id: string, username: string) => async (dispatch: Dispatch) => {
	try {
		dispatch(createNotification('user', 'Updating username...', 'loading'));
		const response = await putUsername(id, username);
		dispatch(updateLoginUsername(response));
		dispatch(createNotification('user', 'Username updated successfully', 'success'));
	} catch (error) {
		dispatch(createNotification('user', `${error.message}`, 'error'));
	}
};

export const updateEmail = (id: string, email: string) => async (dispatch: Dispatch) => {
	try {
		dispatch(createNotification('user', 'Updating email...', 'loading'));
		const response = await putEmail(id, email);
		dispatch(updateLoginEmail(response));
		dispatch(createNotification('user', 'Email updated successfully', 'success'));
	} catch (error) {
		dispatch(createNotification('user', `${error.message}`, 'error'));
	}
};

export const updatePassword = (id: string, oldPassword: string, newPassword: string) => async (dispatch: Dispatch): Promise<boolean> => {
	try {
		dispatch(createNotification('user', 'Updating password...', 'loading'));
		await putPassword(id, oldPassword, newPassword);
		dispatch(createNotification('user', 'Password updated successfully', 'success'));
		return true;
	} catch (error) {
		dispatch(createNotification('user', `${error.message}`, 'error'));
		return false;
	}
};

export const removeEmail = (id: string) => async (dispatch: Dispatch): Promise<boolean> => {
	try {
		dispatch(createNotification('user', 'Deleting email...', 'loading'));
		await deleteEmail(id);
		dispatch(removeLoginEmail());
		dispatch(createNotification('user', 'Email deleted successfully', 'success'));
		return true;
	} catch (error) {
		dispatch(createNotification('user', `${error.message}`, 'error'));
		return false;
	}
};