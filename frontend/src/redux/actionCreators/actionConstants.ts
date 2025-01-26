// Constants for action types for redux reducers
export const ADMIN_ROLE = 'admin';
export const USER_ROLE = 'user';

export interface Message {
	text: string;
	sender: 'user' | 'bot';
}

export interface Stats {
	name: string;
	stats: [];
}

//Chat Actions
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const FETCH_MESSAGE_REQUEST = 'FETCH_MESSAGE_REQUEST';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';

//Snake Actions
export const ADD_SCORE = 'ADD_SCORE';
export const FETCH_SCORES_REQUEST = 'FETCH_SCORE_REQUEST';
export const FETCH_SCORES_SUCCESS = 'FETCH_SCORE_SUCCESS';
export const FETCH_SCORES_FAILURE = 'FETCH_SCORE_FAILURE';
export const POST_SCORE_SUCCESS = 'POST_SCORE_SUCCESS';
export const POST_SCORE_FAILURE = 'POST_SCORE_FAILURE';

//Login actions (not yet implemented)
export const SET_AUTH = 'SET_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const LOGIN_LOADING = 'LOGIN_LOADING';

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