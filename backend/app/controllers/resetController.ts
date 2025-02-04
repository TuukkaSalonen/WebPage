import { Request, Response } from 'express';
import { getPasswordReset, usePasswordReset } from '../../db/queries/token';
import { CustomRequest } from '../middleware/user';
import { validatePassword } from '../utils/validator';
import { updateUserPassword } from '../../db/queries/user';
import bcrypt from 'bcryptjs';
import { saltRounds } from '../utils/constants';
import logger from '../logger';

// Validate password reset token
export const validatePasswordToken = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.params.token;
		if (!token) {
            logger.warn('Password reset: Invalid request - No token provided');
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		const dbToken = await getPasswordReset(token);
		if (!dbToken || dbToken.is_used) {
            logger.warn('Password reset: Invalid token - Token not found or already used');
			res.status(400).json({ status: 400, message: 'Invalid token' });
			return;
		}
		if (dbToken.expires_at < new Date(Date.now())) {
            logger.warn(`Password reset: Token expired`);
			res.status(400).json({ status: 400, message: 'Token expired' });
			return;
		}
        logger.info(`Password reset: Token valid`);
		res.status(200).json({ status: 200, message: 'Token valid' });
	} catch (error) {
        logger.error(`Password reset: ${error}`);
		console.error('Error validating password reset token:', error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Update user password by reset token
export const updateUserPasswordByToken = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { token, password } = req.body;
        if (req.user.id) {
            logger.warn('Password reset: User already logged in');
            res.status(400).json({ status: 400, message: 'User already logged in' });
            return;
        }
        if (!password || !validatePassword(password) || !token) {
            logger.warn('Password reset: Invalid request - No password/token or invalid password provided');
            res.status(400).json({ status: 400, message: 'Invalid request' });
            return;
        }
        const dbToken = await getPasswordReset(token);
        if (!dbToken || dbToken.is_used) {
            logger.warn('Password reset: Invalid token - Token not found or already used');
            res.status(400).json({ status: 400, message: 'Invalid token' });
            return;
        }
        if (dbToken.expires_at < new Date(Date.now())) {
            logger.warn('Password reset: Token expired');
            res.status(400).json({ status: 400, message: 'Expired token' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));
        const updatedUser = await updateUserPassword(dbToken.user_id, hashedPassword);
        if (updatedUser) {
            await usePasswordReset(token);
            logger.info(`Password reset: Password updated for user ${dbToken.user_id}`);
            res.status(200).json({ status: 200, message: 'Password updated' });
        } else {
            logger.warn(`Password reset: User ${dbToken.user_id} not found`);
            res.status(400).json({ status: 400, message: 'User not found' });
        }
    } catch (error) {
        logger.error(`Password reset: ${error}`);
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};