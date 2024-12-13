import { Request, Response } from 'express';
import { setScore, getTopScores } from '../../db/queries/general';

export const getSnakeLeaderboard = async (req: Request, res: Response): Promise<void> => {
	try {
		const response = await getTopScores();
		res.status(200).json({ message: response });
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

export const postSnakeScore = async (req: Request, res: Response): Promise<void> => {
	try {
		const { score } = req.body;
		if (score) {
			await setScore('Guest', score); // At some point implement login names
			res.status(204).json({ status: 204, message: 'No content' });
		} else {
			res.status(400).json({ status: 400, message: 'Bad request' });
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};
