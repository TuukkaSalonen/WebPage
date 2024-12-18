import { incrementAndSelectVisitors } from '../../db/queries/general';
import { Request, Response } from 'express';

export const setAndGetVisitorCount = async (req: Request, res: Response): Promise<void> => {
	try {
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    	console.log(`Request IP: ${ip}`);
		const visitors = await incrementAndSelectVisitors();
		if (!visitors.data) {
			res.status(200).json({ visitorCount: 0 });
		} else {
			res.status(200).json({ visitorCount: visitors.data });
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};