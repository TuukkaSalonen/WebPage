import { SET_AUTH, REMOVE_AUTH } from '../actionConstants.ts';

const initialState = {
	isAuthenticated: false,
	user: 'Guest',
	role: 'Guest',
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH:
			return {
				isAuthenticated: true,
				user: action.payload.user,
				role: action.payload.role,
			};
		case REMOVE_AUTH:
			return initialState;
		default:
			return state;
	}
};

export default authReducer;
