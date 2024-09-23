import express from 'express';
import {setAndGetVisitorCount/*, addVisitor*/} from '../controllers/generalController'

const generalRoutes = express.Router({mergeParams: true});

generalRoutes.get('/visitor', setAndGetVisitorCount);
//generalRoutes.post('/visitor', addVisitor);

export default generalRoutes;