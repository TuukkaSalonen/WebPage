import express from 'express';
import { login, logOut, register, checkAndRefreshLogin, getUserProfile } from '../controllers/loginController';
import { authorizeRole } from '../middleware/user';
import { User, Admin } from '../utils/constants';

const loginRoutes = express.Router({ mergeParams: true });

loginRoutes.post('/', login);
loginRoutes.post('/logout', logOut);
loginRoutes.post('/register', register);

loginRoutes.get('/check', checkAndRefreshLogin);
loginRoutes.get('/profile', authorizeRole([User, Admin]), getUserProfile);

export default loginRoutes;
