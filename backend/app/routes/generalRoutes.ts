import express from 'express';
import {setAndGetVisitorCount/*, addVisitor*/} from '../controllers/visitorController'
import { getChatResponse } from '../controllers/chatController';

const generalRoutes = express.Router({mergeParams: true});

generalRoutes.get('/visitor', setAndGetVisitorCount);
//generalRoutes.post('/visitor', addVisitor);

generalRoutes.post('/chat', getChatResponse);

export default generalRoutes;