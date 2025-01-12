import { ADD_STATS, TOGGLE_VIRTUAL, REMOVE_STATS } from '../actionConstants.ts';

interface StatState {
	name: string;
	stats: [];
	virtual: boolean;
}

const initialState: StatState = {
	name: '',
	stats: [],
	virtual: false,
};

const statReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_STATS:
			return {
				name: action.payload.name,
				stats: action.payload.stats,
				virtual: state.virtual,
			};
		case TOGGLE_VIRTUAL:
			return {
				...state,
				virtual: !state.virtual,
			};
		case REMOVE_STATS:
			return initialState;
		default:
			return state;
	}
};

export default statReducer;