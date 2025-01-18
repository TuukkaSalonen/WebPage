import jwt from 'jsonwebtoken';

const env = process.env;
const secret = env.JWT_SECRET || 'secret';
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
}