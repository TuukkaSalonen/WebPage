import express from 'express';
import { getAllUsers } from '../controllers/userController';
import { authorizeRole } from '../middleware/user';

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get('/', authorizeRole(['admin']), getAllUsers);

// userRoutes.post('/', authorizeRole(['user', 'admin']), getAllUsers);

export default userRoutes;