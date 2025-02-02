import { SET_AUTH, REMOVE_AUTH, UPDATE_USERNAME, UPDATE_EMAIL, LOGIN_LOADING } from '../actionCreators/actionConstants.ts';

const initialState = {
	isAuthenticated: false,
	id: null,
	username: 'Guest',
	email: null,
	role: 'Guest',
	loading: true,
};

// Reducer for login
const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case LOGIN_LOADING:
			return {
				...state,
				loading: true,
			};
		case SET_AUTH:
			return {
				isAuthenticated: true,
				id: action.payload.id,
				username: action.payload.username,
				email: action.payload.email,
				role: action.payload.role,
				loading: false,
			};
		case UPDATE_USERNAME:
			return {
				...state,
				username: action.payload.username,
			};
		case UPDATE_EMAIL:
			return {
				...state,
				email: action.payload.email,
			};
		case REMOVE_AUTH:
			return {
				...initialState,
				loading: false,
			};
		default:
			return state;
	}
};

export default authReducer;
