import { Dispatch } from 'redux';
import { createNotification } from './notificationActions.ts';
import { /*fetchProfile,*/ putEmail, putPassword, putUsername } from './thunks/user.ts';
import { updateLoginEmail, updateLoginUsername } from './loginActions.ts';

// Not currently used

// export const getProfile = (id: string) => async (dispatch: Dispatch) => {
// 	try {
// 		dispatch(createNotification('user', 'Fetching profile...', 'loading'));
// 		const response = await fetchProfile(id);
// 		dispatch(createNotification('user', 'Profile fetched successfully', 'success'));
// 		return response;
// 	} catch (error) {
// 		dispatch(createNotification('snake', `Error fetching profile: ${error.message}`, 'error'));
// 	}
// };

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

