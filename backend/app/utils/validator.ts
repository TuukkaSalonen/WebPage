const usernameRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Validate snake score to have a valid user and score
export const validateSnakeScore = (user: string, score: number): boolean => {
	if (typeof user === 'string' && user.trim().length > 0 && user.length <= 20) {
		if (typeof score === 'number' && score >= 0 && score <= 9999) {
			return true;
		}
	}
	return false;
};

// Validate username
export const validateUsername = (username: string): boolean => {
	if (typeof username === 'string' && username.trim().length > 0 && username.length <= 20) {
		return true;
	}
	return false;
};

// Validate login credentials with minimum password length of 6
export const validateLoginCredentials = (username: string, password: string): boolean => {
	if (
		typeof username === 'string' &&
		username.trim().length > 0 &&
		username.length < 20 &&
		usernameRegex.test(username)
	) {
		if (typeof password === 'string' && password.trim().length > 6) {
			return true;
		}
	}
	return false;
};
export const validateRegisterCredentials = (
	username: string,
	password: string,
	email: string
): boolean => {
	if (validateLoginCredentials(username, password)) {
		if (email && !email.match(emailRegex)) {
			return false;
		}
		return true;
	} else {
		return false;
	}
};
