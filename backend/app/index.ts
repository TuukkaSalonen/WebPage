import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import knex, { Knex } from 'knex';
import { deleteTables, isConnectionClosed } from '../db/dbConnection';
import db from '../db/dbConnection';
import { incrementAndSelectVisitors } from '../db/queries/general';
import generalRoutes from './routes/generalRoutes';

const env = process.env;
const port = env.PORT;

export const app = express();

// Middleware setup
app.use(express.json());

const corsOptions = {
	//origin: `localhost:${port}`,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type'],
  origin: 'http://frontend:3000',
};

app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Apply security headers

app.use("/api/general", generalRoutes);


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
