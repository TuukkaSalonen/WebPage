import {
	ADD_MESSAGE,
	FETCH_MESSAGE_REQUEST,
	FETCH_MESSAGE_SUCCESS,
	FETCH_MESSAGE_FAILURE,
} from '../actionConstants.ts';
import { Message } from '../actionConstants.ts';

interface ChatState {
	messages: Message[];
	loading: boolean;
	error: string | null;
}

const initialState: ChatState = {
	messages: [],
	loading: false,
	error: null,
};

// TODO: REMOVE UNUSED ACTIONS
const chatReducer = (state = initialState, action: any): ChatState => {
	switch (action.type) {
		case ADD_MESSAGE:
			return {
				...state,
				messages: [...state.messages, action.payload],
			};
		case FETCH_MESSAGE_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_MESSAGE_SUCCESS:
			return {
				...state,
				loading: false,
				messages: [...state.messages, action.payload],
			};
		case FETCH_MESSAGE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default chatReducer;
