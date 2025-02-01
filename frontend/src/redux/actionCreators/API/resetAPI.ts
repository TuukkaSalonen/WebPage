import { validatePasswords, validateEmail } from "../thunks/validator.ts";

export const postValidateResetToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api/reset/validate/${token}`, {
            method: 'POST',
        });
        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error validating reset token:', error);
        return false;
    }
}

export const postResetPassword = async (token: string, password: string, confirmPassword: string): Promise<any> => {
    if (!validatePasswords(password, confirmPassword)) {
        throw new Error('Passwords do not match or are too short!');
    }
    try {
        const response = await fetch('/api/reset/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, password }),
        });
        const data = await response.json();
        if (data.message) {
            if (response.ok) {
                return data.message;
            } else {
                throw new Error(data.message);
            }
        } else {
            throw new Error('No message in response');
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        throw new Error('Internal server error');
    }
}

export const postResetPasswordEmail = async (email: string) => {
	try {
		const valid = validateEmail(email);
		if (!valid) {
			throw new Error('Invalid email');
		}
		const response = await fetch('/api/reset/forgot', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
			credentials: 'include',
		});
		const data = await response.json();
		if (!response.ok) {
			if (data.message) {
				throw new Error(data.message);
			} else {
				throw new Error('No message in response');
			}
		}
	} catch (error) {
		throw new Error(error.message);
	}
};