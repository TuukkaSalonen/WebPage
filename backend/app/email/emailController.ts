import { transporter } from './transporter';
import { texts, subjects, mailOptions } from './transporter';
import { Response } from 'express';
import { CustomRequest } from '../middleware/user';
import { validateEmail } from '../utils/validator';
import { getUserByEmail } from '../../db/queries/user';
import { insertPasswordReset } from '../../db/queries/token';
import crypto from 'crypto';
import logger from '../logger';

const frontendUrl = process.env.ENV === 'development' ? process.env.FRONTEND_URL_DEV : process.env.FRONTEND_URL_PROD;

// Generate reset token
const generateResetToken = (): string => {
	return crypto.randomBytes(32).toString('hex');
};

// Create reset link
const createResetLink = (token: string): string => {
	return `${frontendUrl}/reset-password/${token}`;
};

// Send reset password email
export const resetPasswordEmail = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const email = req.body.email;
		const user = req.user;
		if (!validateEmail(email)) {
			logger.warn('Reset password email: Invalid email');
			res.status(400).json({ status: 400, message: 'Invalid email' });
			return;
		}
		if (user.id) {
			logger.warn(`Reset password email: User already logged in - Requester ${user.id}`);
			res.status(400).json({ status: 400, message: 'User is already logged in' });
			return;
		}
		const existingUser = await getUserByEmail(email);
		if (!existingUser) {
			logger.warn(`Reset password email: User with email ${email} not found`);
			res.status(400).json({ status: 400, message: 'User not found' });
			return;
		}
		const resetToken = generateResetToken();
		await insertPasswordReset(existingUser.id, resetToken);

		const resetUrl = createResetLink(resetToken);
		await sendResetPasswordEmail(email, resetUrl);
		logger.info(`Reset password email: Email sent to ${email} - User ${existingUser.id}`);
		res.status(200).json({ status: 200, message: 'Email sent' });
	} catch (error) {
		logger.error(`Reset password email: ${error}`);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Send the actual reset password email containing the reset link
const sendResetPasswordEmail = async (email: string, url: string) => {
	try {
		const options = mailOptions(email, subjects.resetPassword, texts.resetPassword(url));
		await transporter.sendMail(options);
	} catch (error) {
		console.error('Error sending reset password email:', error);
		throw new Error('Error sending reset password email');
	}
};
