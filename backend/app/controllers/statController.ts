import { Request, Response } from 'express';
import { validateUsername } from '../utils/validator';
import { skills } from '../utils/constants';

// Interface for Runescape API response
interface ApiResponse {
	status: number;
	message: any;
}

// Get Runescape stats for a given username
export const getRsStats = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username } = req.params;

		if (!username || !validateUsername(username)) {
			res.status(400).json({ message: 'Invalid username' });
			return;
		}
		const apiResponse = await rsApiRequest(username);
		if (apiResponse.status === 404) {
			res.status(404).json(apiResponse);
			return;
		}
		if (apiResponse.status === 500) {
			res.status(500).json(apiResponse);
			return;
		}
		const response = { status: 200, message: processStats(apiResponse.message) };
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Request data from Runescape API based on username
const rsApiRequest = async (username: string): Promise<ApiResponse> => {
	try {
		const response = await fetch(
			`https://secure.runescape.com/m=hiscore/index_lite.ws?player=${username}`
		);
		if (response.status === 404) {
			return { status: 404, message: 'Player not found' };
		} else if (!response.ok) {
			return { status: 500, message: 'Error in RuneScape API' };
		} else {
			const data = await response.text();
			return { status: 200, message: data };
		}
	} catch (error) {
		throw new Error('Internal server error');
	}
};

// Process Runescape stats data into an array of objects for each skill with rank, level, and experience + image url

// Add virtual level field https://runescape.wiki/w/Experience/Table for each skill
const processStats = (data: string) => {
	try {
		const lines = data.trim().split('\n');
		const highscores = lines.slice(0, skills.length).map((line, index) => {
			const [rank, level, experience] = line.split(',');
			return {
				skill: skills[index],
				rank: parseInt(rank, 10).toLocaleString('en-US'),
				level: parseInt(level, 10).toLocaleString('en-US'),
				experience: parseInt(experience, 10).toLocaleString('en-US'),
			};
		});
		return highscores;
	} catch (error) {
		throw new Error('Error processing stats');
	}
};
