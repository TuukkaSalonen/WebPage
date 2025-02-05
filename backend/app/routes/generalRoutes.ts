import express from 'express';
import { getVisitorCount } from '../controllers/visitorController';
import { getChatResponse } from '../controllers/chatController';
import { getRsStats } from '../controllers/statController';

const generalRoutes = express.Router({ mergeParams: true });

generalRoutes.get('/visitor', getVisitorCount);
generalRoutes.get('/rs/:username', getRsStats);

generalRoutes.post('/chat', getChatResponse);


export default generalRoutes;
