import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import generalRoutes from './routes/generalRoutes';
import cookieParser from 'cookie-parser';
//import userRoutes from './routes/userRoutes';
import setDefaultUser from './middleware/user';
import { corsOptions, limiter } from './middleware/cors';

export const app = express();

// Trust the first proxy
app.set('trust proxy', 1);

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(limiter); // Apply rate limiting
app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Apply security headers
app.use(morgan('combined')); // Log HTTP requests
app.use(setDefaultUser); // Set default user cookie

app.use('/api/general', generalRoutes);
//app.use('/api/user', userRoutes);
