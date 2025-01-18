import jwt from 'jsonwebtoken';

const env = process.env;
const secret = env.JWT_SECRET || 'secret';
const recaptchaSecret = env.RECAPTCHA_SECRET_KEY || 'recaptchaSecret';
const expiration = env.COOKIE_EXPIRATION || '1h';
const refreshExpiration = env.REFRESH_COOKIE_EXPIRATION || '7d';

export const createTokens = (user: any) => {
	const accessToken = jwt.sign({ username: user.username, role: user.role }, secret, {
		expiresIn: expiration,
	});

	const refreshToken = jwt.sign({ username: user.username, role: user.role }, secret, {
		expiresIn: refreshExpiration,
	});

	return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, user) => {
			if (err) {
				reject(err);
			}
			resolve(user);
		});
	});
};

export const verifyRecaptcha = async (token: string) => {
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	);
	const data = await response.json();
	return data.success;
};
