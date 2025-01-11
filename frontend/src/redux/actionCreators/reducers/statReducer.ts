import { ADD_STATS, REMOVE_STATS } from '../actionConstants.ts';

interface StatState {
	name: string;
    stats: [];
}

const initialState: StatState = {
	name: '',
    stats: [],
};

const statReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATS:
      return {
        name: action.payload.name,
        stats: action.payload.stats,
      };
    case REMOVE_STATS:
      return initialState;
    default:
      return state;
  }
};

export default statReducer;