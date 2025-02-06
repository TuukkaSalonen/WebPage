// API request to validate reset token
export const postValidateResetToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api/reset/validate/${token}`, {
            method: 'POST',
        });
        const data = await response.json();
		if (data.message) {
			if (!response.ok) {
				throw new Error(data.message);
			}
			return data.message;
		} else {
			throw new Error('No message in response');
		}
    } catch (error) {
        //console.error('Error validating reset token:', error);
        throw new Error(error.message);
    }
}

// API request to reset password with token
export const postResetPassword = async (token: string, password: string): Promise<any> => {
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
			if (!response.ok) {
				throw new Error(data.message);
			}
			return data.message;
		} else {
			throw new Error('No message in response');
		}
    } catch (error) {
        //console.error('Error resetting password:', error);
        throw new Error(error.message);
    }
}

// API request to send reset password email
export const postResetPasswordEmail = async (email: string) => {
	try {
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
        //console.error('Error posting password email request:', error);
		throw new Error(error.message);
	}
};