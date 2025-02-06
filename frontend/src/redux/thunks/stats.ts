import { Dispatch } from 'redux';
import { getStats } from '../API/statAPI.ts';
import { createNotification } from '../actionCreators/notificationActions.ts';
import { fetchStatsSuccess } from '../actionCreators/statActions.ts';

// Thunk for fetching rs stats from the backend
export const fetchStats = (username: string) => async (dispatch: Dispatch) => {
	if (!username || username.trim() === '') {
		dispatch(createNotification('stats', 'Please enter a valid username!', 'error'));
		return;
	}
	if (username.length > 12) {
		dispatch(createNotification('stats', 'Username is too long! (max 12 characters)', 'error'));
		return;
	}
	dispatch(createNotification('stats', 'Fetching stats', 'loading'));
	try {
		const statResponse = await getStats(username);
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
