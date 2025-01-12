// Constants for action types for redux reducers

//Chat Actions
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const FETCH_MESSAGE_REQUEST = 'FETCH_MESSAGE_REQUEST';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';

export interface Message {
	text: string;
	sender: 'user' | 'bot';
}

export interface Stats {
	name: string;
	stats: [];
}

//Snake Actions
export const ADD_SCORE = 'ADD_SCORE';
export const FETCH_SCORES_REQUEST = 'FETCH_SCORE_REQUEST';
export const FETCH_SCORES_SUCCESS = 'FETCH_SCORE_SUCCESS';
export const FETCH_SCORES_FAILURE = 'FETCH_SCORE_FAILURE';
export const POST_SCORE_SUCCESS = 'POST_SCORE_SUCCESS';
export const POST_SCORE_FAILURE = 'POST_SCORE_FAILURE';

//Login actions (not yet implemented)
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

//Notification actions
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

//Stat actions
export const ADD_STATS = 'ADD_STATS';
export const REMOVE_STATS = 'REMOVE_STATS';
export const TOGGLE_VIRTUAL = 'TOGGLE_VIRTUAL';
export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILURE = 'FETCH_STATS_FAILURE';