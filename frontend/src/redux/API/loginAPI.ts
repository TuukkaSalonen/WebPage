import { LoginResponse } from '../interfaces.ts';

// API request to check user login status
export const getLogin = async (): Promise<boolean> => {
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
				return false;
			}
			return true;
		} else {
			return false;
		}
	} catch (error) {
		//console.error('Error checking login:', error);
		return false;
	}
};

// API request to fetch user profile
export const getProfile = async (): Promise<any> => {
	try {
		const response = await fetch(`/api/login/profile`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const userData = await response.json();
		if (response.ok && userData.message) {
			return userData.message;
		} else {
			return false;
		}
	} catch (error) {
		//console.error('Error getting profile:', error);
		return false;
	}
};

// API request to log in user
export const postLogin = async (username: string, password: string): Promise<LoginResponse> => {
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
		if (data.message) {
			if (response.ok) {
				if (!data.accessToken) {
					return { message: data.message, status: false };
				} else {
					return { message: data.message, status: true };
				}
			} else {
				return { message: data.message, status: false };
			}
		} else {
			return { message: 'No message in response', status: false };
		}
	} catch (error) {
		//console.error('Error logging in:', error);
		throw new Error('Internal server error');
	}
};

// API request to log out user
export const postLogout = async (): Promise<boolean> => {
	try {
		const response = await fetch('/api/login/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		if (response.ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		//console.error('Error logging out:', error);
		return false;
	}
};

// API request to register user
export const postRegister = async (username: string, password: string, email: string, recaptchaToken: string): Promise<LoginResponse> => {
	try {
		const response = await fetch('/api/login/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password, email, recaptchaToken }),
			credentials: 'include',
		});
		const data = await response.json();
		if (data.message) {
			if (response.ok) {
				return { message: data.message, status: true };
			} else {
				return { message: data.message, status: false };
			}
		} else {
			return { message: 'No message in response', status: false };
		}
	} catch (error) {
		//console.error('Error registering:', error);
		throw new Error('Internal server error');
	}
};
