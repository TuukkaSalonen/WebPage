import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import generalRoutes from './routes/generalRoutes';
import cookieParser from 'cookie-parser';
//import loginRoutes from './routes/loginRoutes';
import { setDefaultUser } from './controllers/loginController';

const env = process.env;
const frontendUrl = env.ENV === "production" ? `https://localhost:${env.FRONTEND_PORT_SSL}` : `http://localhost:${env.FRONTEND_PORT}`;
export const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes,
	max: 100, // limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again after 15 minutes',
});

const corsOptions = {
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type'],
	origin: `${frontendUrl}`,
  credentials: true
};

// Trust the first proxy
app.set('trust proxy', 1);

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(limiter); // Apply rate limiting
app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Apply security headers
app.use(morgan('combined')); // Log HTTP requests
app.use(setDefaultUser)

app.use('/api/general', generalRoutes);
//app.use('/api/login', loginRoutes);
