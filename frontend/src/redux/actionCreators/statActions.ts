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