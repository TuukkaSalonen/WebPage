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