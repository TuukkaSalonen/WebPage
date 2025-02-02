import { ADD_STATS, TOGGLE_VIRTUAL, REMOVE_STATS } from '../actionCreators/actionConstants.ts';

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

// Reducer for rs stats
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
