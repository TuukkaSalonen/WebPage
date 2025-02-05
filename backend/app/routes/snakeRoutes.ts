import express from 'express';
import { getSnakeLeaderboard, postSnakeScore, getUserSnakeScores } from '../controllers/snakeController';
import { authorizeRole } from '../middleware/user';
import { User, Admin } from '../utils/constants';

const snakeRoutes = express.Router({ mergeParams: true });

snakeRoutes.get('/', getSnakeLeaderboard);
snakeRoutes.get('/user/:id', authorizeRole([User, Admin]), getUserSnakeScores);
snakeRoutes.get('/user', authorizeRole([User, Admin]), getUserSnakeScores);

snakeRoutes.post('/', postSnakeScore);

export default snakeRoutes;