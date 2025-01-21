import express from 'express';
import { login, logOut, register, checkAndRefreshLogin, getUserProfile } from '../controllers/loginController';

const loginRoutes = express.Router({ mergeParams: true });

loginRoutes.post('/', login);

loginRoutes.post('/logout', logOut);

loginRoutes.post('/register', register);

loginRoutes.get('/check', checkAndRefreshLogin);

loginRoutes.get('/profile', getUserProfile);

export default loginRoutes;