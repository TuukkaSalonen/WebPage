import {
	ADD_MESSAGE,
	FETCH_MESSAGE_REQUEST,
	FETCH_MESSAGE_SUCCESS,
	FETCH_MESSAGE_FAILURE,
} from '../chatActions.ts';

interface Message {
	text: string;
	sender: 'user' | 'bot';
}

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
