import {
	ADD_SCORE,
	FETCH_SCORES_FAILURE,
	FETCH_SCORES_REQUEST,
	FETCH_SCORES_SUCCESS,
	POST_SCORE_FAILURE,
	POST_SCORE_SUCCESS,
} from '../actionConstants.ts';

interface SnakeState {
	scores: number[];
	loading: boolean;
	error: string | null;
}

const initialState: SnakeState = {
	scores: [],
	loading: false,
	error: null,
};

const snakeReducer = (state = initialState, action: any): SnakeState => {
	switch (action.type) {
		case ADD_SCORE:
			return {
				...state,
				scores: [...state.scores, action.payload].sort((a, b) => b.score - a.score).slice(0, 10),
			};
		case FETCH_SCORES_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_SCORES_SUCCESS:
			return {
				...state,
				loading: false,
				scores: action.payload.sort((a, b) => b.score - a.score)
			};
		case FETCH_SCORES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case POST_SCORE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
			};
		case POST_SCORE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default snakeReducer;
