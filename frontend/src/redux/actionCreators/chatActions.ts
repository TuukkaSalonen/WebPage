import { Dispatch } from 'redux';
import { fetchChatRequest } from './thunks/chat.ts';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const FETCH_MESSAGE_REQUEST = 'FETCH_MESSAGE_REQUEST';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';

interface Message {
	text: string;
	sender: 'user' | 'bot';
}

export const addMessage = (message: Message) => ({
	type: ADD_MESSAGE,
	payload: message,
});

export const fetchMessageRequest = () => ({
	type: FETCH_MESSAGE_REQUEST,
});

export const fetchMessageSuccess = (message: Message) => ({
	type: FETCH_MESSAGE_SUCCESS,
	payload: message,
});

export const fetchMessageFailure = (error: string) => ({
	type: FETCH_MESSAGE_FAILURE,
	payload: error,
});

export const sendMessage = (message: string) => async (dispatch: Dispatch) => {
	dispatch(fetchMessageRequest());
	try {
		const userMessage: Message = { text: message, sender: 'user' };
		dispatch(addMessage(userMessage));

		const botResponse = await fetchChatRequest(message);
		const botMessage: Message = { text: botResponse, sender: 'bot' };
		dispatch(fetchMessageSuccess(botMessage));
	} catch (error) {
		dispatch(fetchMessageFailure(error.message));
	}
};
