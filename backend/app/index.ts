import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import knex, { Knex } from 'knex';
import { deleteTables, isConnectionClosed } from '../db/dbConnection';
import db from '../db/dbConnection';
import { incrementAndSelectVisitors } from '../db/queries/general';
import generalRoutes from './routes/generalRoutes';

const env = process.env;
const port = env.FRONTEND_PORT;

export const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes,
	max: 100, // limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again after 15 minutes',
});

const corsOptions = {
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type'],
	origin: `http://frontend:${port}`,
};

// Trust the first proxy
app.set('trust proxy', 1);

// Middleware setup
app.use(express.json());
app.use(limiter); // Apply rate limiting
app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Apply security headers

app.use(morgan('dev')); // Log HTTP requests for development

app.use('/api/general', generalRoutes);

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
