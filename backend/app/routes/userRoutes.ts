import express from 'express';
import {
	getAllUsers,
	updateUserEmailById,
	updateUserPasswordById,
	updateUsernameById,
	updateUserRoleById,
	getUserById,
	deleteUserEmailById,
	deleteUserById,
} from '../controllers/userController';
import { authorizeRole } from '../middleware/user';
import { User, Admin } from '../utils/constants';

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get('/', authorizeRole([Admin]), getAllUsers);
userRoutes.get('/:id', authorizeRole([User, Admin]), getUserById);

userRoutes.put('/:id/email', authorizeRole([User, Admin]), updateUserEmailById);
userRoutes.put('/:id/username', authorizeRole([User, Admin]), updateUsernameById);
userRoutes.put('/:id/password', authorizeRole([User, Admin]), updateUserPasswordById);
userRoutes.put('/:id/role', authorizeRole([Admin]), updateUserRoleById);

userRoutes.delete('/:id/email', authorizeRole([User, Admin]), deleteUserEmailById);
userRoutes.delete('/:id', authorizeRole([User, Admin]), deleteUserById);

export default userRoutes;
