import {
	ADD_SCORE,
	FETCH_SCORES_FAILURE,
	FETCH_SCORES_REQUEST,
	FETCH_SCORES_SUCCESS,
	POST_SCORE_FAILURE,
	POST_SCORE_SUCCESS,
} from './actionConstants.ts';

export const addScore = (scoreObject: Object) => ({
	type: ADD_SCORE,
	payload: scoreObject,
});

export const fetchScoreRequest = () => ({
	type: FETCH_SCORES_REQUEST,
});

export const fetchScoresSuccess = (scores: [Object]) => ({
	type: FETCH_SCORES_SUCCESS,
	payload: scores,
});

export const fetchScoresFailure = (error: string) => ({
	type: FETCH_SCORES_FAILURE,
	payload: error,
});

export const postScoreSuccess = () => ({
	type: POST_SCORE_SUCCESS,
});

export const postScoreFailure = (error: string) => ({
	type: POST_SCORE_FAILURE,
	payload: error,
});