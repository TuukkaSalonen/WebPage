import express from 'express';
import { getVisitorCount } from '../controllers/visitorController';
import { getChatResponse } from '../controllers/chatController';
import { getSnakeLeaderboard, postSnakeScore } from '../controllers/snakeController';

const generalRoutes = express.Router({ mergeParams: true });

generalRoutes.get('/visitor', getVisitorCount);

generalRoutes.post('/chat', getChatResponse);

generalRoutes.get('/snake', getSnakeLeaderboard);
generalRoutes.post('/snake', postSnakeScore);

export default generalRoutes;
