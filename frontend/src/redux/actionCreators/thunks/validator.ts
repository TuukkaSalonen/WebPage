export const emailRegex = '^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$';

export const validateEmail = (email) => {
	if (!email || !email.match(emailRegex)) {
		return false;
	}
	return true;
};

export const validatePasswords = (password, confirmPassword) => {
	if (!password || password.trim().length < 6 || !confirmPassword || confirmPassword.trim().length < 6 || password !== confirmPassword) {
		return false;
	}
	return true;
};
