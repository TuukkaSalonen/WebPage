import { incrementAndSelectVisitors } from '../../db/queries/general';
import { Request, Response } from 'express';

export const setAndGetVisitorCount = async (req: Request, res: Response): Promise<void> => {
	try {
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

/*
export const addVisitor = async (req: Request, res: Response): Promise<void> => {
	try {
		await incrementVisitorCount();
		const visitors = await selectVisitors();
		const count = visitors.data ? visitors.data : 0;
		res.status(200).json({ visitorCount: count });
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};
*/