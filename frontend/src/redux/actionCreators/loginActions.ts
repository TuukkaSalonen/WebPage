// Not yet implemented

import { Dispatch } from 'redux';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from './actionConstants.ts';

export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const loginSuccess = (user: Object) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logout = () => ({
    type: LOGOUT,
});

export const login = (username: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(loginSuccess(data.user));
        } else {
            dispatch(loginFailure(data.message));
        }
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};