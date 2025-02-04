import { Request, Response } from 'express';
import { setScore, getTopScores, getScoresById } from '../../db/queries/snake';
import { validateSnakeScore } from '../utils/validator';
import { CustomRequest } from '../middleware/user';
import { validateId } from '../utils/validator';
import { getUser } from '../../db/queries/user';
import { Guest } from '../utils/constants';
import logger from '../logger';

// Get snake leaderboard from database
export const getSnakeLeaderboard = async (req: Request, res: Response): Promise<void> => {
	try {
		const response = await getTopScores();
		logger.info('Snake: Leaderboard fetched');
		res.status(200).json({ status: 200, message: response });
	} catch (error) {
		logger.error(`Snake: ${error}`);
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Post snake score to database
export const postSnakeScore = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const { score } = req.body;
		const user = req.user;
		if (validateSnakeScore(score)) {
			let scoreObject;
			if (user.role === Guest) {
				scoreObject = await setScore(Guest, null, score);
			} else {
				const dbUser = await getUser(user.id);
				if (!dbUser) {
					logger.warn('Snake: Add snake score - User not found');
					res.status(404).json({ status: 404, message: 'User not found' });
					return;
				}
				scoreObject = await setScore(dbUser.username, user.id, score);
			}
			logger.info('Snake: Add snake score success');
			res.status(200).json({ status: 200, message: scoreObject });
		} else {
			logger.warn('Snake: Add snake score - Invalid request');
			res.status(400).json({ status: 400, message: 'Bad request' });
		}
	} catch (error) {
		logger.error(`Snake: ${error}`);
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Get snake scores by id. If id is not provided, get scores for logged in user.
// Else get scores for user with provided id if user role is admin.
export const getUserSnakeScores = async (req: CustomRequest, res: Response): Promise<void> => {
	try {
		const user = req.user;
		const { id } = req.params;
		if (!user.id) {
			logger.warn('Snake: Get user snake scores - User not logged in');
			res.status(401).json({ status: 401, message: 'Unauthorized' });
			return;
		}
		let userId = user.id;
		if (id && user.role === 'admin') {
			if (!validateId(id)) {
				logger.warn('Snake: Get user snake scores - Admin request - Invalid params id');
				res.status(400).json({ status: 400, message: 'Invalid request' });
				return;
			}
			userId = id;
		}
		const scores = await getScoresById(userId);
		logger.info(`Snake: Get user ${userId} snake scores success`);
		res.status(200).json({ status: 200, message: scores });
	} catch (error) {
		logger.error(`Snake: ${error}`);
		console.error('Error fetching user snake scores:', error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};
