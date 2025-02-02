import { ADD_MESSAGE, FETCH_MESSAGE_FAILURE, FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS } from './actionConstants.ts';
import { Message } from './actionConstants.ts';

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