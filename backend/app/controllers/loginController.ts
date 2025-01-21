import { Request, Response } from 'express';
import { validateLoginCredentials, validateRegisterCredentials } from '../utils/validator';
import { createUser, getUserByUsername } from '../../db/queries/user';
import bcrypt from 'bcryptjs';
import { createTokens, verifyToken, verifyRecaptcha } from '../services/loginServices';
import { getUser } from '../../db/queries/user';
import { CustomRequest } from '../middleware/user';

const env = process.env;
const cookie = env.COOKIE_NAME || 'token';
const saltRounds = env.SALT_ROUNDS || '10';
const isProduction = process.env.ENV === 'production';

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password } = req.body;
		if (validateLoginCredentials(username, password)) {
			const user = await getUserByUsername(username);
			if (user && (await bcrypt.compare(password, user.password))) {
				const { accessToken, refreshToken } = createTokens(user);
				res.cookie(cookie, accessToken, {
					httpOnly: true,
					secure: isProduction,
					sameSite: 'strict',
					maxAge: 3600000,
				});
				res.cookie('refresh_token', refreshToken, {
					httpOnly: true,
					secure: isProduction,
					sameSite: 'strict',
					maxAge: 604800000,
				});
				res.status(200).json({ status: 200, message: 'Login successful', accessToken });
			} else {
				res.status(401).json({ status: 401, message: 'Invalid credentials' });
			}
		} else {
			res.status(400).json({ status: 400, message: 'Invalid input' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie(cookie);
		res.clearCookie('refresh_token');
		res.status(200).json({ status: 200, message: 'Logout successful' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

export const checkAndRefreshLogin = async (req: Request, res: Response): Promise<void> => {
	try {
		const accessToken = req.cookies[cookie];
		const refreshToken = req.cookies['refresh_token'];

		if (!accessToken && !refreshToken) {
			res.status(200).json({ status: 200, message: 'Not logged in' });
		}
		if (accessToken) {
			const user = await verifyToken(accessToken);
			if (!user) {
				if (!refreshToken) {
					res.status(200).json({ status: 200, message: 'Not logged in' });
					return;
				}
			} else {
				res.status(200).json({ status: 200, message: 'Logged in', accessToken });
				return;
			}
		}
		if (refreshToken) {
			const user = await verifyToken(refreshToken);
			if (user) {
				const { accessToken, refreshToken: newRefreshToken } = createTokens(user);
				res.cookie(cookie, accessToken, {
					httpOnly: true,
					secure: isProduction,
					sameSite: 'strict',
					maxAge: 3600000,
				});
				res.cookie('refresh_token', newRefreshToken, {
					httpOnly: true,
					secure: isProduction,
					sameSite: 'strict',
					maxAge: 604800000,
				});
				res.status(200).json({ status: 200, message: 'Token refreshed', accessToken });
			} else {
				res.status(401).json({ status: 401, message: 'Invalid refresh token' });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password, recaptchaToken, email } = req.body;
		const recaptchaSuccess = await verifyRecaptcha(recaptchaToken);
		if (!recaptchaSuccess) {
			res.status(400).json({ status: 400, message: 'Invalid recaptcha' });
			return;
		}
		if (validateRegisterCredentials(username, password, email)) {
			const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));
			const existingUser = await getUserByUsername(username);
			if (existingUser) {
				res.status(409).json({ status: 409, message: 'User already exists' });
				return;
			}
			const user = await createUser(username, hashedPassword, email);
			res.status(200).json({ status: 200, message: 'User created', user });
		} else {
			res.status(400).json({ status: 400, message: 'Invalid input' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

export const getUserProfile = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const reqUser = req.user;

		if (reqUser && reqUser.id) {
			const user = await getUser(reqUser.id);
			if (user) {
				res.status(200).json({ status: 200, message: user });
			} else {
				res.status(400).json({ status: 400, message: 'User not found' });
			}
		} else {
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};