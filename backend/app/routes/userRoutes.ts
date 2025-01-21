import express from 'express';
import { getAllUsers, updateUserEmailById, updateUserPasswordById, updateUsernameById, updateUserRoleById, getUserById } from '../controllers/userController';
import { authorizeRole } from '../middleware/user';

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get('/', authorizeRole(['admin']), getAllUsers);
userRoutes.get('/:id', authorizeRole(['user', 'admin']), getUserById);

userRoutes.put('/:id/email', authorizeRole(['user', 'admin']), updateUserEmailById);
userRoutes.put('/:id/username', authorizeRole(['user', 'admin']), updateUsernameById);
userRoutes.put('/:id/password', authorizeRole(['user', 'admin']), updateUserPasswordById);
userRoutes.put('/:id/role', authorizeRole(['admin']), updateUserRoleById);

export default userRoutes;
