import express from 'express';
import { getSnakeLeaderboard, postSnakeScore, getUserSnakeScores } from '../controllers/snakeController';
import { authorizeRole } from '../middleware/user';

const snakeRoutes = express.Router({ mergeParams: true });

snakeRoutes.get('/', getSnakeLeaderboard);

snakeRoutes.get('/user/:id', authorizeRole(['user', 'admin']), getUserSnakeScores);

snakeRoutes.get('/user', authorizeRole(['user', 'admin']), getUserSnakeScores);

snakeRoutes.post('/', postSnakeScore);

export default snakeRoutes;