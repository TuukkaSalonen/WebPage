import rateLimit from 'express-rate-limit';

const env = process.env;

const frontendUrl = env.ENV === 'production' ? `https://tuukkasalonen.fi` : `http://localhost:${env.FRONTEND_PORT}`;

export const corsOptions = {
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type'],
	origin: `${frontendUrl}`,
	credentials: true,
};

export const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes,
	max: 200, // limit each IP to 200 requests per windowMs
	handler: (req, res) => {
		res.status(429).json({
			status: 429,
			message: 'Too many requests from this IP, please try again after 10 minutes',
		});
	},
});
