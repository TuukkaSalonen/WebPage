import { Request, Response } from 'express';
import { validateLoginCredentials, validateRegisterCredentials } from '../utils/validator';
import { createUser, getUser } from '../../db/queries/user';
import bcrypt from 'bcryptjs';
import { createTokens, verifyToken } from '../services/loginServices';

const env = process.env;
const cookie = env.COOKIE_NAME || 'token';
const saltRounds = env.SALT_ROUNDS || '10';

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password } = req.body;
		if (validateLoginCredentials(username, password)) {
			const user = await getUser(username);
			if (user && (await bcrypt.compare(password, user.password))) {
				const { accessToken, refreshToken } = createTokens(user);
				res.cookie(cookie, accessToken, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					maxAge: 3600000,
				});
				res.cookie('refresh_token', refreshToken, {
					httpOnly: true,
					secure: true,
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
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie(cookie);
		res.clearCookie('refresh_token');
		res.status(200).json({ status: 200, message: 'Logout successful' });
	} catch (error) {
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
					secure: true,
					maxAge: 3600000,
				});
				res.cookie('refresh_token', newRefreshToken, {
					httpOnly: true,
					secure: true,
					maxAge: 604800000,
				});
				res.status(200).json({ status: 200, message: 'Token refreshed', accessToken });
			} else {
				res.status(401).json({ status: 401, message: 'Invalid refresh token' });
			}
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password, email } = req.body;
		if (validateRegisterCredentials(username, password, email)) {
			const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));
			const existingUser = await getUser(username);
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

// export const refreshLogin = async (req: Request, res: Response): Promise<void> => {
// 	try {
// 		const token = req.cookies[cookie];
// 		const refreshToken = req.cookies['refresh_token'];
// 		if (!token && !refreshToken) {
// 			res.status(401).json({ message: 'Not logged in' });
// 			return;
// 		}
// 		const user = await verifyToken(refreshToken);
// 		if (user) {
// 			const { accessToken, refreshToken: newRefreshToken } = createTokens(user);
// 			res.cookie(cookie, accessToken, {
// 				httpOnly: true,
// 				secure: true,
// 				maxAge: 3600000,
// 			});
// 			res.cookie('refresh_token', newRefreshToken, {
// 				httpOnly: true,
// 				secure: true,
// 				maxAge: 604800000,
// 			});
// 			res.status(200).json({ status: 200, message: 'Token refreshed', accessToken });
// 		} else {
// 			res.status(401).json({ status: 401, message: 'Invalid refresh token' });
// 		}
// 	} catch (error) {
// 		res.status(500).json({ status: 500, message: 'Internal server error' });
// 	}
// };