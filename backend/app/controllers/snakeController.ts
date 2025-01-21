import { Request, Response } from 'express';
import { setScore, getTopScores } from '../../db/queries/general';
import { validateSnakeScore } from '../utils/validator';
import { CustomRequest } from '../middleware/user';

// Get snake leaderboard from database
export const getSnakeLeaderboard = async (req: Request, res: Response): Promise<void> => {
	try {
		const response = await getTopScores();
		res.status(200).json({ status: 200, message: response });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Post snake score to database
export const postSnakeScore = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const { score } = req.body;
		const user = req.user;
		if (validateSnakeScore(user.username, score)) {
			const scoreObject = await setScore(user.username, score);
			res.status(200).json({ status: 200, message: scoreObject });
		} else {
			res.status(400).json({ status: 400, message: 'Bad request' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};
