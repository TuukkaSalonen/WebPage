import { Request, Response } from 'express';
import { setScore, getTopScores } from '../../db/queries/general';
import { validateSnakeScoreRequest } from '../utils/validator';

export const getSnakeLeaderboard = async (req: Request, res: Response): Promise<void> => {
	try {
		const cookies = req.cookies;
		console.log(cookies);
		const response = await getTopScores();
		res.status(200).json({ message: response });
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

export const postSnakeScore = async (req: Request, res: Response): Promise<void> => {
	try {
		const { score } = req.body;
		const user = req.cookies.user ? JSON.parse(req.cookies.user) : { name: 'Guest' };
		if (validateSnakeScoreRequest(user.name, score)) {
			const scoreObject = await setScore(user.name, score);
			res.status(200).json({ status: 200, message: scoreObject });
		} else {
			res.status(400).json({ status: 400, message: 'Bad request' });
		}
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};
