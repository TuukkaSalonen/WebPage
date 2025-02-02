import { Dispatch } from 'redux';
import { postChatMessage } from '../API/chatAPI.ts';
import { addMessage, fetchMessageFailure, fetchMessageRequest, fetchMessageSuccess } from '../actionCreators/chatActions.ts';
import { Message } from '../interfaces.ts';

// Send message thunk for chatbot
export const sendMessage = (message: string) => async (dispatch: Dispatch) => {
	dispatch(fetchMessageRequest());
	try {
		const userMessage: Message = { text: message, sender: 'user' };
		dispatch(addMessage(userMessage));
		const botResponse = await postChatMessage(message);
		const botMessage: Message = { text: botResponse, sender: 'bot' };
		dispatch(fetchMessageSuccess(botMessage));
	} catch (error) {
		dispatch(fetchMessageFailure(error.message));
	}
};