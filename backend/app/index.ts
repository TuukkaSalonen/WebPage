import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

export const app = express();

// Middleware setup
app.use(express.json());

const corsOptions = {
    origin: 'localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Apply security headers

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
