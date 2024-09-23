import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

/*
    Reducers here
*/

export const reducers = combineReducers({});

const store = legacy_createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;