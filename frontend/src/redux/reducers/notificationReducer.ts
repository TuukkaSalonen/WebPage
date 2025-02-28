import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actionCreators/actionConstants.ts';

const initialState = {};

// Reducer for notifications
const notificationReducer = (state = initialState, action) => {
	let newState: Object;
	switch (action.type) {
		case ADD_NOTIFICATION:
			return {
				...state,
				[action.payload.type]: {
					message: action.payload.message,
					status: action.payload.status,
				},
			};
		case REMOVE_NOTIFICATION:
			newState = { ...state };
			delete newState[action.payload.type];
			return newState;
		default:
			return state;
	}
};

export default notificationReducer;
