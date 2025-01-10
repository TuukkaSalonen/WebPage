import { Request, Response } from 'express';
import { setScore, getTopScores } from '../../db/queries/general';
import { validateSnakeScore } from '../utils/validator';

// Get snake leaderboard from database
export const getSnakeLeaderboard = async (req: Request, res: Response): Promise<void> => {
	try {
		const cookies = req.cookies;
		console.log(cookies);
		const response = await getTopScores();
		res.status(200).json({ status: 200, message: response });
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Post snake score to database
export const postSnakeScore = async (req: Request, res: Response): Promise<void> => {
	try {
		const { score } = req.body;
		const user = req.cookies.user ? JSON.parse(req.cookies.user) : { name: 'Guest' };
		if (validateSnakeScore(user.name, score)) {
			const scoreObject = await setScore(user.name, score);
			res.status(200).json({ status: 200, message: scoreObject });
		} else {
			res.status(400).json({ status: 400, message: 'Bad request' });
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};
