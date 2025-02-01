import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import generalRoutes from './routes/generalRoutes';
import cookieParser from 'cookie-parser';
import loginRoutes from './routes/loginRoutes';
import { verifyToken } from './middleware/user';
import { corsOptions, limiter } from './middleware/cors';
import { clearExpiredRefreshTokens, clearExpiredPasswordTokens } from '../db/queries/token';
import userRoutes from './routes/userRoutes';
import snakeRoutes from './routes/snakeRoutes';
import resetRoutes from './routes/resetRoutes';
import schedule from 'node-schedule';

export const app = express();

// Clear expired refresh tokens every day at midnight
schedule.scheduleJob('0 0 * * *', async () => {
	try {
		console.log('Clearing expired tokens');
		await clearExpiredRefreshTokens();
		await clearExpiredPasswordTokens();
	} catch (error) {
		console.error('Error clearing expired tokens:', error);
	}
});

// Trust the first proxy
app.set('trust proxy', 1);

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(limiter); // Apply rate limiting
app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Apply security headers
app.use(morgan('combined')); // Log HTTP requests
app.use(verifyToken); // Verify JWT token

app.use('/api/general', generalRoutes);
app.use('/api/snake', snakeRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reset', resetRoutes);
