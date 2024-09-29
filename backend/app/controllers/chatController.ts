import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
const AI_KEY = process.env.AI_KEY || 'Error';

const genAI = new GoogleGenerativeAI(AI_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const getChatResponse = async (req: Request, res: Response): Promise<void> => {
	try {
		const message = req.body.message.toString();
		const response = await generateAIResponse(message);
		res.status(200).json({ message: response });
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error' });
	}
};

const generateAIResponse = async (message: string) => {
	try {
		const generated = await model.generateContent(message);
		return generated.response.text();
	} catch (error) {
		console.error(error);
		return 'Error occurred when generating message';
	}
};
