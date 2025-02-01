import { Request, Response } from 'express';
import { getPasswordReset, usePasswordReset } from '../../db/queries/token';
import { CustomRequest } from '../middleware/user';
import { validatePassword } from '../utils/validator';
import { updateUserPassword } from '../../db/queries/user';
import bcrypt from 'bcryptjs';
import { saltRounds } from '../utils/constants';

// Validate password reset token
export const validatePasswordToken = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.params.token;
		if (!token) {
			res.status(400).json({ status: 400, message: 'Invalid request' });
			return;
		}
		const dbToken = await getPasswordReset(token);
		if (!dbToken || dbToken.is_used) {
			res.status(400).json({ status: 400, message: 'Invalid token' });
			return;
		}
		if (dbToken.expires_at < new Date(Date.now())) {
			res.status(400).json({ status: 400, message: 'Token expired' });
			return;
		}
		res.status(200).json({ status: 200, message: 'Token valid' });
	} catch (error) {
		console.error('Error validating password reset token:', error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Update user password by reset token
export const updateUserPasswordByToken = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { token, password } = req.body;
        if (req.user.id) {
            res.status(400).json({ status: 400, message: 'User already logged in' });
            return;
        }
        if (!password || !validatePassword(password) || !token) {
            console.log(password, token);
            res.status(400).json({ status: 400, message: 'Invalid request' });
            return;
        }
        const dbToken = await getPasswordReset(token);
        if (!dbToken || dbToken.is_used) {
            res.status(400).json({ status: 400, message: 'Invalid token' });
            return;
        }
        if (dbToken.expires_at < new Date(Date.now())) {
            res.status(400).json({ status: 400, message: 'Expired token' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));
        const updatedUser = await updateUserPassword(dbToken.user_id, hashedPassword);
        if (updatedUser) {
            await usePasswordReset(token);
            res.status(200).json({ status: 200, message: 'Password updated' });
        } else {
            res.status(400).json({ status: 400, message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};