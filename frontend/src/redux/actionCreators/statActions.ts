import { Dispatch } from 'redux';
import { getRsStats } from './thunks/stats.ts';
import { createNotification } from './notificationActions.ts';
import { ADD_STATS, TOGGLE_VIRTUAL, REMOVE_STATS } from './actionConstants.ts';

export const fetchStatsSuccess = (stats: Object) => ({
	type: ADD_STATS,
	payload: stats,
});

export const emptyStats = () => ({
	type: REMOVE_STATS,
});

export const toggleVirtual = () => ({
	type: TOGGLE_VIRTUAL,
});


export const getStats = (username: string) => async (dispatch: Dispatch) => {
	if (!username || username.trim() === '') {
		dispatch(createNotification('stats', 'Please enter a valid username', 'error'));
		return;
	}
	if (username.length > 12) {
		dispatch(createNotification('stats', 'Username is too long (max 12 characters)', 'error'));
		return
	}
	dispatch(createNotification('stats', 'Fetching stats...', 'loading'));
	try {
		const statResponse = await getRsStats(username);
		if (Array.isArray(statResponse)) {
			dispatch(fetchStatsSuccess({ name: username, stats: statResponse }));
            dispatch(createNotification('stats', 'Stats fetched successfully', 'success'));
		} else {
			dispatch(createNotification('stats', statResponse, 'error'));
		}
	} catch (error) {
		dispatch(createNotification('stats', error.message, 'error'));
	}
};
