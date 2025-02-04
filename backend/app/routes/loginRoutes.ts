import express from 'express';
import { login, logOut, register, checkAndRefreshLogin, getUserProfile } from '../controllers/loginController';
import { authorizeRole } from '../middleware/user';

const loginRoutes = express.Router({ mergeParams: true });

loginRoutes.post('/', login);

loginRoutes.post('/logout', logOut);

loginRoutes.post('/register', register);

loginRoutes.get('/check', checkAndRefreshLogin);

loginRoutes.get('/profile', authorizeRole(['user', 'admin']), getUserProfile);

export default loginRoutes;