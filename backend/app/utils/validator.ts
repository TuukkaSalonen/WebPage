const usernameRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Validate snake score to have a valid user and score
export const validateSnakeScore = (score: number): boolean => {
	if (typeof score === 'number' && score >= 0 && score <= 9999) {
		return true;
	}
	return false;
};

// Validate username
export const validateUsername = (username: string): boolean => {
	if (typeof username === 'string' && username.trim().length > 0 && username.length <= 20 && usernameRegex.test(username)) {
		return true;
	}
	return false;
};

// Validate id
export const validateId = (id: string): boolean => {
	if (typeof id === 'string' && id.trim().length === 36) {
		return true;
	}
	return false;
};

// Validate password
export const validatePassword = (password: string): boolean => {
	if (typeof password === 'string' && password.trim().length > 6) {
		return true;
	}
	return false;
};

// Validate email
export const validateEmail = (email: string): boolean => {
	if (typeof email === 'string' && email.trim().length > 0 && email.match(emailRegex)) {
		return true;
	}
	return false;
};

// Validate role
export const validateRole = (role: string): boolean => {
	if (typeof role === 'string' && (role === 'user' || role === 'admin')) {
		return true;
	}
	return false;
};

// Validate login credentials with minimum password length of 6
export const validateLoginCredentials = (username: string, password: string): boolean => {
	if (validateUsername(username)) {
		if (validatePassword(password)) {
			return true;
		}
	}
	return false;
};

// Validate register credentials with minimum password length of 6 and optional email
export const validateRegisterCredentials = (username: string, password: string, email: string): boolean => {
	if (validateLoginCredentials(username, password)) {
		if (email && !validateEmail(email)) {
			return false;
		}
		return true;
	} else {
		return false;
	}
};
