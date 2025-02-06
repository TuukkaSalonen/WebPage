import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import logger from '../logger';

const AI_KEY = process.env.AI_KEY || 'Error';
const genAI = new GoogleGenerativeAI(AI_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Get response from AI model and return response to user
export const getChatResponse = async (req: Request, res: Response): Promise<void> => {
	try {
		const message = req.body.message;
		if (!message || message.trim().length < 1) {
			logger.warn('Chat: Invalid input - No message provided');
			res.status(400).json({ status: 400, message: 'Invalid input!' });
			return;
		}
		const response = await generateAIResponse(message);
		logger.info(`Chat: Successful response generated`);
		res.status(200).json({ status: 200, message: response });
	} catch (error) {
		logger.error(`Chat: ${error}`);
		console.log(error);
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

// Generate AI response based on user message
const generateAIResponse = async (message: string) => {
	try {
		const generated = await model.generateContent(message);
		return generated.response.text();
	} catch (error) {
		logger.error(`Chat: Error generating AI response: ${error}`);
		console.error(error);
		return 'Error occurred when generating message';
	}
};
