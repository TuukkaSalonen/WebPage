import jwt, { JwtPayload } from 'jsonwebtoken';
import { getRefreshToken, insertRefreshToken } from '../../db/queries/token';
import { getUser } from '../../db/queries/user';

const env = process.env;
const secret = env.JWT_SECRET || 'secret';
const recaptchaSecret = env.RECAPTCHA_SECRET_KEY || 'recaptchaSecret';
const expiration = env.COOKIE_EXPIRATION || '1h';
const refreshExpiration = env.REFRESH_COOKIE_EXPIRATION || '7d';

// Create token and refresh token
export const createTokens = async (user: any): Promise<any> => {
	try {
		const accessToken = jwt.sign({ id: user.id, role: user.role }, secret, {
			expiresIn: expiration,
		});

		const refreshToken = jwt.sign({ id: user.id, role: user.role }, secret, {
			expiresIn: refreshExpiration,
		});
		await insertRefreshToken(user.id, refreshToken);
		return { accessToken, refreshToken };
	} catch (error) {
		console.error('Error creating tokens:', error);
		throw new Error('Error creating tokens');
	}
};

// Verify refresh token and check database for validity
export const verifyRefreshToken = async (refreshToken: string): Promise<any | null> => {
	try {
		const decoded = jwt.verify(refreshToken, secret) as JwtPayload;

		const tokenRecord = await getRefreshToken(refreshToken);
		if (!tokenRecord || tokenRecord.is_revoked || tokenRecord.expires_at < new Date(Date.now())) {
			return null;
		}
		const user = await getUser(decoded.id);
		if (!user) {
			return null;
		}

		return user;
	} catch (error) {
		console.error('Refresh token verification failed:', error);
		return null;
	}
};

// Verify recaptcha token
export const verifyRecaptcha = async (token: string) => {
	try {
		const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		const data = await response.json();
		return data.success;
	} catch (error) {
		console.error('Recaptcha verification failed:', error);
		return false;
	}
};
