import express from 'express';
import { resetPasswordEmail } from '../email/emailController';
import { updateUserPasswordByToken } from '../controllers/resetController';
import { validatePasswordToken } from '../controllers/resetController';

const resetRoutes = express.Router({ mergeParams: true });

resetRoutes.post('/forgot', resetPasswordEmail);
resetRoutes.post('/validate/:token', validatePasswordToken);
resetRoutes.post('/password', updateUserPasswordByToken);

export default resetRoutes;