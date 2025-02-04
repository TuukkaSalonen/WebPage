import { incrementVisitor, selectVisitors } from '../../db/queries/general';
import { Request, Response } from 'express';
import logger from '../logger';

// Get visitor count
export const getVisitorCount = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!checkVisitorCookie(req)) {
			await incrementVisitor();
			setVisitorCookie(req, res);
		}
		const visitors = await selectVisitors();
		if (!visitors.data) {
			logger.warn('Visitor count: No visitors found - Returning 0');
			res.status(200).json({ status: 200, visitorCount: 0 });
		} else {
			res.status(200).json({ status: 200, visitorCount: visitors.data });
		}
	} catch (error) {
		logger.error(`Visitor count: ${error}`);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Set visitor cookie to prevent visitor count increment on page refresh
const setVisitorCookie = (req: Request, res: Response) => {
    if (!req.cookies.visitor) {
      res.cookie('visitor', 'true', { maxAge: 3600000, httpOnly: true, secure: true });
    }
};

// Check if visitor cookie is set
const checkVisitorCookie = (req: Request) => {
	return req.cookies.visitor ? true : false;
};