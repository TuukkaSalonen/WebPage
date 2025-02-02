import { Dispatch } from 'redux';
import { postSnakeScore, getSnakeLeaderboard, getUserSnakeScores } from '../API/snakeAPI.ts';
import { addScore, postScoreFailure, postScoreSuccess, fetchScoreRequest, fetchScoresSuccess, fetchScoresFailure } from '../actionCreators/snakeActions.ts';
import { createNotification } from '../actionCreators/notificationActions.ts';

// Send score thunk for snake game
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

// Fetch scores thunk for snake game
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

// Fetch user scores thunk for snake scores
export const fetchUserScores = (userId: string) => async (dispatch: Dispatch): Promise<any> => {
	try {
		const scores = await getUserSnakeScores(userId);
		return scores;
	} catch (error) {
		dispatch(createNotification('snake', `Error fetching scores: ${error.message}`, 'error'));
		return [];
	}
};
