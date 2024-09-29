import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import chatReducer from './actionCreators/reducers/chatReducer.ts';
/*
    Reducers here
*/

export const reducers = combineReducers({
    chat: chatReducer,
});

const store = legacy_createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;