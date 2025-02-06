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
	deleteUser,
} from '../../db/queries/user';
import { CustomRequest } from '../middleware/user';
import bcrypt from 'bcryptjs';
import { validateEmail, validateId, validatePassword, validateRole, validateUsername } from '../utils/validator';
import { saltRounds } from '../utils/constants';
import logger from '../logger';
import { Admin } from '../utils/constants';

// Get all users from database
export const getAllUsers = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const reqUser = req.user;
		if (reqUser.id && reqUser.role === Admin) {
			const users = await getUsers();
			if (users) {
				logger.info('Users: All users fetched - Admin access - Requester: ' + reqUser.id);
				res.status(200).json({ status: 200, message: users });
			} else {
				logger.warn('Users: No users found - Admin access - Requester: ' + reqUser.id);
				res.status(200).json({ status: 200, message: [] });
			}
		} else {
			logger.warn('Users: Access denied - Requester: ' + (reqUser.id ? reqUser.id : 'Guest'));
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		logger.error(`Users: ${error}`);
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
			logger.warn(`User: Invalid request - Invalid id - Requester: ${reqUser.id}`);
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser.id === req.params.id || reqUser.role === Admin) {
			const user = await getUser(id);
			if (user) {
				logger.info(`User: User ${user.id} fetched - Requester: ${reqUser.id}`);
				res.status(200).json({ status: 200, message: user });
			} else {
				logger.warn(`User: User ${id} not found - Requester: ${reqUser.id ? reqUser.id : 'Guest'}`);
				res.status(404).json({ status: 404, message: 'User not found' });
			}
		} else {
			logger.warn(`User: Access denied - Requester: ${reqUser.id} - Target: ${id}`);
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		logger.error(`User: ${error}`);
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

		if (!email || !validateEmail(email) || !validateId(userId)) {
			logger.warn(`Update user email: Invalid request - Invalid email or id - Requester: ${reqUser.id}`);
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser.id === req.params.id || reqUser.role === Admin) {
			const existingUser = await getUserByEmail(email);
			if (existingUser) {
				logger.warn(`Update user email: Email already in use - Requester: ${reqUser.id} - Target: ${userId}`);
				res.status(409).json({ status: 409, message: 'Email already in use' });
				return;
			}
			const updatedUser = await updateUserEmail(userId, email);
			if (updatedUser) {
				logger.info(`Update user email: User ${updatedUser.id} email updated - Requester: ${reqUser.id}`);
				res.status(200).json({ status: 200, message: updatedUser.email });
			} else {
				logger.warn(`Update user email: User ${userId} not found - Requester: ${reqUser.id}`);
				res.status(404).json({ status: 404, message: 'User not found' });
			}
		} else {
			logger.warn(`Update user email: Access denied - Requester: ${reqUser.id} - Target: ${userId}`);
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		logger.error(`Update user email: ${error}`);
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
		if (!oldPassword || !newPassword || !validateId(userId) || !validatePassword(oldPassword) || !validatePassword(newPassword)) {
			logger.warn(`Update user password: Invalid request - Invalid id or password - Requester: ${reqUser.id}`);
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser.id === req.params.id || reqUser.role === Admin) {
			const password = await getUserPasswordById(userId);
			if (!password) {
				logger.warn(`Update user password: User ${userId} not found - Requester: ${reqUser.id}`);
				res.status(404).json({ status: 404, message: 'User not found' });
				return;
			}
			if (await bcrypt.compare(oldPassword, password.password)) {
				const hashedPassword = await bcrypt.hash(newPassword, parseInt(saltRounds));
				console.log(hashedPassword);
				const updatedUser = await updateUserPassword(userId, hashedPassword);
				if (updatedUser) {
					logger.info(`Update user password: User ${userId} password updated - Requester: ${reqUser.id}`);
					res.status(200).json({ status: 200, message: 'Password updated' });
				} else {
					logger.warn(`Update user password: User ${userId} not found - Requester: ${reqUser.id}`);
					res.status(404).json({ status: 404, message: 'User not found' });
				}
			} else {
				logger.warn(`Update user password: Invalid password - Requester: ${reqUser.id} - Target: ${userId}`);
				res.status(401).json({ status: 401, message: 'Invalid password' });
			}
		} else {
			logger.warn(`Update user password: Access denied - Requester: ${reqUser.id} - Target: ${userId}`);
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		logger.error(`Update user password: ${error}`);
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

		if (!username || !validateUsername(username) || !validateId(userId)) {
			logger.warn(`Update username: Invalid request - Invalid username or id - Requester: ${reqUser.id}`);
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser.id === req.params.id || reqUser.role === Admin) {
			const existingUser = await getUserByUsername(username);
			if (existingUser) {
				logger.warn(`Update username: Username ${username} already exists - Requester: ${reqUser.id} - Target: ${userId}`);
				res.status(409).json({ status: 409, message: 'Username already exists' });
				return;
			}
			const updatedUser = await updateUsername(userId, username);
			if (updatedUser) {
				logger.info(`Update username: User ${updatedUser.id} username updated - Requester: ${reqUser.id}`);
				res.status(200).json({ status: 200, message: updatedUser.username });
			} else {
				logger.warn(`Update username: User ${userId} not found - Requester: ${reqUser.id}`);
				res.status(404).json({ status: 404, message: 'User not found' });
			}
		} else {
			logger.warn(`Update username: Access denied - Requester: ${reqUser.id} - Target: ${userId}`);
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		logger.error(`Update username: ${error}`);
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

		if (!role || !validateId(userId) || !validateRole(role)) {
			logger.warn(`Update user role: Invalid request - Invalid id or role - Requester: ${reqUser.id}`);
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser.id && reqUser.role === Admin) {
			const updatedUser = await updateUserRole(userId, role);
			if (updatedUser.length > 0) {
				logger.info(`Update user role: User ${updatedUser[0].id} role updated to ${updatedUser[0].role} - Requester: ${reqUser.id}`);
				res.status(200).json({ status: 200, message: 'Role updated' });
			} else {
				logger.warn(`Update user role: User ${userId} not found - Requester: ${reqUser.id}`);
				res.status(404).json({ status: 404, message: 'User not found' });
			}
		} else {
			logger.warn(`Update user role: Access denied - Requester: ${reqUser.id} - Target: ${userId}`);
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		logger.error(`Update user role: ${error}`);
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
			logger.warn(`Delete user email: Invalid request - Invalid id - Requester: ${reqUser.id}`);
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser.id === req.params.id || reqUser.role === Admin) {
			const updatedUser = await deleteUserEmail(userId);
			if (updatedUser.length > 0) {
				logger.info(`Delete user email: User ${userId} email deleted - Requester: ${reqUser.id}`);
				res.status(200).json({ status: 200, message: 'Email deleted' });
			} else {
				logger.warn(`Delete user email: User ${userId} not found - Requester: ${reqUser.id}`);
				res.status(404).json({ status: 404, message: 'User not found' });
			}
		} else {
			logger.warn(`Delete user email: Access denied - Requester: ${reqUser.id} - Target: ${userId}`);
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		logger.error(`Delete user email: ${error}`);
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
			logger.warn(`Delete user: Invalid request (id) - Requester: ${reqUser.id}`);
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		if (reqUser.id === req.params.id || reqUser.role === Admin) {
			const deletedUser = await deleteUser(userId);
			if (deletedUser) {
				logger.info(`Delete user: User ${userId} deleted - Requester: ${reqUser.id}`);
				res.status(200).json({ status: 200, message: 'User deleted' });
			} else {
				logger.warn(`Delete user: User ${userId} not found - Requester: ${reqUser.id}`);
				res.status(404).json({ status: 404, message: 'User not found' });
			}
		} else {
			logger.warn(`Delete user: Access denied - Requester: ${reqUser.id} - Target: ${userId}`);
			res.status(403).json({ status: 403, message: 'Access denied' });
		}
	} catch (error) {
		logger.error(`Delete user: ${error}`);
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};