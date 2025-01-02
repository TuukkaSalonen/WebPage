import { incrementVisitor, selectVisitors } from '../../db/queries/general';
import { Request, Response } from 'express';

export const getVisitorCount = async (req: Request, res: Response): Promise<void> => {
	try {
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    	console.log(`Request IP: ${ip}`);

		if (!checkVisitorCookie(req, res)) {
			await incrementVisitor();
			setVisitorCookie(req, res);
		}
		const visitors = await selectVisitors();
		if (!visitors.data) {
			res.status(200).json({ visitorCount: 0 });
		} else {
			res.status(200).json({ visitorCount: visitors.data });
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

const setVisitorCookie = (req: Request, res: Response) => {
    if (!req.cookies.visitor) {
      res.cookie('visitor', 'true', { maxAge: 3600000, httpOnly: true, secure: true });
    }
};

const checkVisitorCookie = (req: Request, res: Response) => {
	return req.cookies.visitor ? true : false;
};