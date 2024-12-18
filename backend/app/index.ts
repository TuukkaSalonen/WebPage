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
const frontendUrl = `http://localhost:${env.FRONTEND_PORT}`

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
app.use(express.json());
app.use(cookieParser());
app.use(limiter); // Apply rate limiting
app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Apply security headers
app.use(morgan('combined')); // Log HTTP requests
app.use(setDefaultUser)

app.use('/api/general', generalRoutes);
//app.use('/api/login', loginRoutes);

// Basic served HTML page
app.get('/', async (req, res) => {
	res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Backend</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>This is a basic html page for backend.</h1>
      </div>
    </body>
    </html>
  `);
});
