import { Dispatch } from 'redux';
import {
	ADD_SCORE,
	FETCH_SCORES_FAILURE,
	FETCH_SCORES_REQUEST,
	FETCH_SCORES_SUCCESS,
	POST_SCORE_FAILURE,
	POST_SCORE_SUCCESS,
} from './actionConstants.ts';
import { getSnakeLeaderboard, postSnakeScore, getUserSnakeScores } from './thunks/snake.ts';
import { createNotification } from './notificationActions.ts';

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

export const sendScore = (score: number) => async (dispatch: Dispatch) => {
	try {
		const response = await postSnakeScore(score);
		dispatch(addScore(response));
		dispatch(postScoreSuccess());
	} catch (error) {
		dispatch(postScoreFailure(error.message));
		dispatch(createNotification('snake', `Error sending score: ${error.message}`, 'error'));
	}
};

export const fetchScores = () => async (dispatch: Dispatch) => {
	dispatch(fetchScoreRequest());
	try {
		const scores = await getSnakeLeaderboard();
		dispatch(fetchScoresSuccess(scores));
	} catch (error) {
		dispatch(fetchScoresFailure(error.message));
		dispatch(createNotification('snake', `Error fetching scores: ${error.message}`, 'error'));
	}
};

export const fetchUserScores = (userId: string) => async (dispatch: Dispatch): Promise<any> => {
	try {
		const scores = await getUserSnakeScores(userId);
		return scores;
	} catch (error) {
		dispatch(createNotification('snake', `Error fetching scores: ${error.message}`, 'error'));
		return [];
	}
};
