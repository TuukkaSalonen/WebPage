import { Request, Response } from 'express';
import { validateLoginCredentials, validateRegisterCredentials } from '../utils/validator';
import { createUser, getUserByUsername, getUserByEmail } from '../../db/queries/user';
import { revokeRefreshToken } from '../../db/queries/token';
import bcrypt from 'bcryptjs';
import { createTokens, verifyRecaptcha, verifyRefreshToken } from '../services/loginServices';
import { getUser } from '../../db/queries/user';
import { CustomRequest } from '../middleware/user';
import { saltRounds } from '../utils/constants';
import logger from '../logger';

const env = process.env;
const cookie = env.COOKIE_NAME || 'token';
const isProduction = env.NODE_ENV === 'production';

// Log user in and add access token and refresh token to cookies
export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password } = req.body;
		if (validateLoginCredentials(username, password)) {
			const user = await getUserByUsername(username);
			if (user && (await bcrypt.compare(password, user.password))) {
				const { accessToken, refreshToken } = await createTokens(user);
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
				logger.info(`Login attempt: User ${user.id} - Login successful`);
				res.status(200).json({ status: 200, message: 'Login successful', accessToken });
			} else {
				logger.warn(`Login attempt: Username ${username} - Invalid credentials`);
				res.status(401).json({ status: 401, message: 'Invalid credentials!' });
			}
		} else {
			logger.warn(`Login attempt: Invalid input`);
			res.status(400).json({ status: 400, message: 'Invalid input!' });
		}
	} catch (error) {
		console.log(error);
		logger.error(`Login attempt: ${error}`);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Log user out and remove access token and refresh token from cookies
export const logOut = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const user = req.user;
		const refreshToken = req.cookies['refresh_token'];

		res.clearCookie(cookie);
		res.clearCookie('refresh_token');
		
		if (refreshToken) {
			await revokeRefreshToken(refreshToken);
		}
		if (user && user.id) {
			logger.info(`Logout successful: User ${user.id}`);
		} else {
			logger.info(`Logout successful`);
		}
		res.status(200).json({ status: 200, message: 'Logout successful' });
	} catch (error) {
		console.log(error);
		logger.error(`Logout attempt: ${error}`);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Check if user is logged in and refresh token if necessary
export const checkAndRefreshLogin = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const accessToken = req.cookies[cookie];
		const refreshToken = req.cookies['refresh_token'];

		if (!accessToken && !refreshToken) {
			logger.warn(`Login check: Not logged in - No access token or refresh token`);
			res.status(200).json({ status: 200, message: 'Not logged in' });
		}
		if (accessToken) {
			const user = req.user;
			if (!user.id) {
				if (!refreshToken) {
					logger.warn(`Login check: Not logged in - No refresh token`);
					res.status(200).json({ status: 200, message: 'Not logged in' });
					return;
				}
			} else {
				logger.info(`Login check: User ${user.id} logged in.`);
				res.status(200).json({ status: 200, message: 'Logged in', accessToken });
				return;
			}
		}
		if (refreshToken) {
			const user = await verifyRefreshToken(refreshToken);
			if (user) {
				const { accessToken, refreshToken: newRefreshToken } = await createTokens(user);
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
				logger.info(`Login check: User ${user.id} - Token refreshed`);
				res.status(200).json({ status: 200, message: 'Token refreshed', accessToken });
			} else {
				res.clearCookie(cookie);
				res.clearCookie('refresh_token'); // Clear cookies if user not found (deleted account etc.)
				logger.warn(`Login check: Not logged in - Invalid or old refresh token`);
				res.status(401).json({ status: 401, message: 'Invalid or old refresh token!' });
			}
		}
	} catch (error) {
		console.log(error);
		logger.error(`Login check: ${error}`);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Register new user
export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password, recaptchaToken, email } = req.body;
		const recaptchaSuccess = await verifyRecaptcha(recaptchaToken);
		if (!recaptchaSuccess) {
			logger.warn(`Register attempt: Invalid recaptcha`);
			res.status(400).json({ status: 400, message: 'Invalid recaptcha!' });
			return;
		}
		if (validateRegisterCredentials(username, password, email)) {
			const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));
			const existingUsername = await getUserByUsername(username);
			if (existingUsername) {
				logger.warn(`Register attempt: Username ${username} already in use`);
				res.status(409).json({ status: 409, message: 'Username already in use!' });
				return;
			}
			if (email) {
				const existingEmail = await getUserByEmail(email);
				if (existingEmail) {
					logger.warn(`Register attempt: Email ${email} already in use`);
					res.status(409).json({ status: 409, message: 'Email already in use!' });
					return;
				}
			}
			const user = await createUser(username, hashedPassword, email);
			logger.info(`Register attempt: User ${user.id} created`);
			res.status(200).json({ status: 200, message: 'User created', user });
		} else {
			res.status(400).json({ status: 400, message: 'Invalid input!' });
		}
	} catch (error) {
		logger.error(`Register attempt: ${error}`);
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Get user profile based on the user id in the access token
export const getUserProfile = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const reqUser = req.user;
		if (reqUser && reqUser.id) {
			const user = await getUser(reqUser.id);
			if (user) {
				logger.info(`Get user profile: User ${user.id} profile retrieved`);
				res.status(200).json({ status: 200, message: user });
			} else {
				logger.warn(`Get user profile: User ${reqUser.id} not found`);
				res.clearCookie(cookie);
				res.clearCookie('refresh_token'); // Shouldn't get here but clear cookies to logout just in case
				res.status(404).json({ status: 404, message: 'User not found!' });
			}
		} else {
			logger.warn(`Get user profile: Not logged in`); // Shouldnt get here either due to middleware
			res.status(403).json({ status: 403, message: 'Access denied!' });
		}
	} catch (error) {
		logger.error(`Get user profile: ${error}`);
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};
