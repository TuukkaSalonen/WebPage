import express from 'express';
import { getVisitorCount } from '../controllers/visitorController';
import { getChatResponse } from '../controllers/chatController';
import { getSnakeLeaderboard, postSnakeScore } from '../controllers/snakeController';
import { getRsStats } from '../controllers/statController';

const generalRoutes = express.Router({ mergeParams: true });

generalRoutes.get('/visitor', getVisitorCount);

generalRoutes.post('/chat', getChatResponse);

generalRoutes.get('/rs/:username', getRsStats);

export default generalRoutes;
