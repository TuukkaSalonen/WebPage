import { Request, Response } from 'express';
import { getUsers } from '../../db/queries/user';

// Get all users from database
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await getUsers();
		if (users) {
			res.status(200).json({ status: 200, visitorCount: 0 });
		} else {
			res.status(200).json({ status: 200, visitorCount: users });
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};