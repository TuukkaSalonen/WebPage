import { Response } from 'express';
import {
	getUsers,
	updateUserEmail,
	getUser,
	getUserByEmail,
	updateUserPassword,
	updateUserRole,
	updateUsername,
	getUserByUsername,
	getUserPasswordById,
	deleteUserEmail,
	deleteUser
} from '../../db/queries/user';
import { CustomRequest } from '../middleware/user';
import bcrypt from 'bcryptjs';
import { validateEmail, validateId, validatePassword, validateRole, validateUsername } from '../utils/validator';

const saltRounds = process.env.SALT || '10';

// Get all users from database
export const getAllUsers = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const reqUser = req.user;
		if (reqUser && reqUser.role === 'admin') {
			const users = await getUsers();
			if (users) {
				res.status(200).json({ status: 200, message: users });
			} else {
				res.status(200).json({ status: 200, message: [] });
			}
		} else {
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Get user by id
export const getUserById = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const id = req.params.id;
		const reqUser = req.user;

		if (!validateId(id)) {
			res.status(400).json({ status: 400, message: 'Invalid request' });
		}
		if (reqUser && (reqUser.id === req.params.id || reqUser.role === 'admin')) {
			const user = await getUser(id);
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

// Update user by id
export const updateUserEmailById = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const { email } = req.body;
		const userId = req.params.id;
		const reqUser = req.user;

		if (!validateEmail(email) || !validateId(userId)) {
			res.status(400).json({ status: 400, message: 'Invalid request' });
		}
		if (reqUser && (reqUser.id === req.params.id || reqUser.role === 'admin')) {
			const existingUser = await getUserByEmail(email);
			if (existingUser) {
				res.status(400).json({ status: 409, message: 'Email already in use' });
				return;
			}
			const updatedUser = await updateUserEmail(userId, email);
			if (updatedUser) {
				res.status(200).json({ status: 200, message: updatedUser.email });
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

// Update user password by id
export const updateUserPasswordById = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const { oldPassword, newPassword } = req.body;
		const userId = req.params.id;
		const reqUser = req.user;
		if (!validateId(userId) || !validatePassword(oldPassword) || !validatePassword(newPassword)) {
			res.status(400).json({ status: 400, message: 'Invalid request' });
		}
		if (reqUser && (reqUser.id === req.params.id || reqUser.role === 'admin')) {
			const password = await getUserPasswordById(userId);
			if (password && (await bcrypt.compare(oldPassword, password))) {
				const hashedPassword = await bcrypt.hash(newPassword, parseInt(saltRounds));
				const updatedUser = await updateUserPassword(userId, hashedPassword);
				if (updatedUser) {
					res.status(200).json({ status: 200, message: 'Password updated' });
				} else {
					res.status(400).json({ status: 400, message: 'User not found' });
				}
			} else {
				res.status(400).json({ status: 400, message: 'Invalid password' });
			}
		} else {
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Update username by id
export const updateUsernameById = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const { username } = req.body;
		const userId = req.params.id;
		const reqUser = req.user;

		if (!validateUsername(username) || !validateId(userId)) {
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser && (reqUser.id === req.params.id || reqUser.role === 'admin')) {
			const existingUser = await getUserByUsername(username);
			if (existingUser) {
				res.status(400).json({ status: 400, message: 'Username already exists' });
				return;
			}
			const updatedUser = await updateUsername(userId, username);
			if (updatedUser) {
				res.status(200).json({ status: 200, message: updatedUser.username });
			} else {
				console.log('User not found');
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

// Update user role by id.
export const updateUserRoleById = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const { role } = req.body;
		const userId = req.params.id;
		const reqUser = req.user;

		if (!validateId(userId) || !validateRole(role)) {
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser && reqUser.role === 'admin') {
			const updatedUser = await updateUserRole(userId, role);
			if (updatedUser) {
				res.status(200).json({ status: 200, message: 'Role updated' });
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

// Delete user email by id
export const deleteUserEmailById = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const userId = req.params.id;
		const reqUser = req.user;

		if (!validateId(userId)) {
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser && (reqUser.id === req.params.id || reqUser.role === 'admin')) {
			const updatedUser = await deleteUserEmail(userId);
			if (updatedUser) {
				res.status(200).json({ status: 200, message: 'Email deleted' });
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

// Delete user by id
export const deleteUserById = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const userId = req.params.id;
		const reqUser = req.user;

		if (!validateId(userId)) {
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser && (reqUser.id === req.params.id || reqUser.role === 'admin')) {
			const deletedUser = await deleteUser(userId);
			if (deletedUser) {
				res.status(200).json({ status: 200, message: 'User deleted' });
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

/*
1. Create a Tokens Table
Create a table to store tokens in your PostgreSQL database.

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

2. Save Tokens When Created
Save the tokens in the database when they are created.

import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { User } from '../models/user'; // Adjust the import based on your project structure

const pool = new Pool(); // Configure your PostgreSQL connection
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const createTokens = async (user: User) => {
    const accessToken = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id }, secret, { expiresIn: '7d' });

    const accessTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour
    const refreshTokenExpiresAt = new Date(Date.now() + 604800000); // 7 days

    await pool.query(
        'INSERT INTO tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, accessToken, accessTokenExpiresAt]
    );
    await pool.query(
        'INSERT INTO tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, refreshToken, refreshTokenExpiresAt]
    );

    return { accessToken, refreshToken };
};

3. Invalidate Tokens When User is Deleted
Remove the user's tokens from the database when the user is deleted.

import { Request, Response } from 'express';
import { Pool } from 'pg';
import { deleteUserById } from '../services/userService';

const pool = new Pool(); // Configure your PostgreSQL connection

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const user = await deleteUserById(userId);

        if (user) {
            await pool.query('DELETE FROM tokens WHERE user_id = $1', [userId]);

            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

4. Middleware to Check Token Validity
Create middleware to check if the token is valid by querying the database.

import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

const pool = new Pool(); // Configure your PostgreSQL connection

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['access_token'];
    const result = await pool.query('SELECT * FROM tokens WHERE token = $1', [token]);

    if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Token is invalid' });
    }

    next();
};

export default checkToken;

5. Update Login and Check Token Functions
Ensure that the login and checkAndRefreshLogin functions handle token storage correctly.

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUserByUsername, validateLoginCredentials } from '../services/userService';
import { createTokens, verifyToken } from '../utils/tokenUtils';

const cookie = 'access_token';
const isProduction = process.env.NODE_ENV === 'production';

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

export const checkAndRefreshLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const accessToken = req.cookies[cookie];
        const refreshToken = req.cookies['refresh_token'];

        if (!accessToken && !refreshToken) {
            res.status(200).json({ status: 200, message: 'Not logged in' });
            return;
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
*/