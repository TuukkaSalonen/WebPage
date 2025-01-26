import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import chatReducer from './actionCreators/reducers/chatReducer.ts';
import snakeReducer from './actionCreators/reducers/snakeReducer.ts';
import notificationReducer from './actionCreators/reducers/notificationReducer.ts';
import statReducer from './actionCreators/reducers/statReducer.ts';
import loginReducer from './actionCreators/reducers/loginReducer.ts';

/*
    Reducers here
*/
const reducers = combineReducers({
    chat: chatReducer,
    snake: snakeReducer,
    notification: notificationReducer,
    stats: statReducer,
    auth: loginReducer,
});

const store = legacy_createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof reducers>;

export default store;