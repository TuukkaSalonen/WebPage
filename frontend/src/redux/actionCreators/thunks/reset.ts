import { Dispatch } from 'redux';
import { postResetPassword, postValidateResetToken, postResetPasswordEmail } from '../API/resetAPI.ts';
import { createNotification } from '../notificationActions.ts';

export const validateResetToken = (token: string) => async (dispatch: Dispatch): Promise<boolean> => {
	try {
		const valid = await postValidateResetToken(token);
		if (!valid) {
			dispatch(createNotification('reset-password', 'Invalid or expired token', 'error'));
			return false;
		}
		return true;
	} catch (error) {
		dispatch(createNotification('reset-password', error.message, 'error'));
		return false;
	}
};


export const resetPassword = (token: string, password: string, confirmPassword: string, navigate: Function) => async (dispatch: Dispatch): Promise<any> => {
	try {
		dispatch(createNotification('reset-password', 'Resetting password', 'loading'));
		await postResetPassword(token, password, confirmPassword);
		dispatch(createNotification('reset-password', 'Password reset', 'success'));
		navigate('/login');
	} catch (error) {
		dispatch(createNotification('reset-password', `${error.message}`, 'error'));
	}
};

export const resetPasswordEmail = (email: string) => async (dispatch: Dispatch): Promise<any> => {
	try {
		dispatch(createNotification('reset-password', `Sending password reset email`, 'loading'));
		await postResetPasswordEmail(email);
		dispatch(createNotification('reset-password', 'Password reset email sent', 'success'));
		return true;
	} catch (error) {
		dispatch(createNotification('reset-password', `${error.message}`, 'error'));
		return false;
	}
};