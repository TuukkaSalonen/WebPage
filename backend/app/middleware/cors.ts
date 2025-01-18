import rateLimit from 'express-rate-limit';

const env = process.env;

const frontendUrl =
	env.ENV === 'production'
		? `https://localhost:${env.FRONTEND_PORT_SSL}`
		: `http://localhost:${env.FRONTEND_PORT}`;

export const corsOptions = {
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type'],
	origin: `${frontendUrl}`,
	credentials: true,
};

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes,
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});