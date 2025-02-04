import nodemailer from 'nodemailer';

const env = process.env;

// Create transporter
export const transporter = nodemailer.createTransport({
	host: env.EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASSWORD,
	},
});

// Mail options configuration
export const mailOptions = (receiver: string, subject: string, text: string) => ({
	from: env.EMAIL_USER,
	to: receiver,
	subject: subject,
	text: text,
});

// Email subjects
export const subjects = {
	resetPassword: 'Reset your password',
};

// Email texts
export const texts = {
	resetPassword: (url: string) =>
		`Hello, you have requested a password change.\n\nClick the link below to reset your password:\n${url}\n\nIf you did not do this request, please ignore this email.\n\n${emailEndText}`,
};

// Email end text
const emailEndText = 'Sincerely,\nTuukka';
