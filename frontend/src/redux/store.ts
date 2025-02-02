import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import chatReducer from './reducers/chatReducer.ts';
import snakeReducer from './reducers/snakeReducer.ts';
import notificationReducer from './reducers/notificationReducer.ts';
import statReducer from './reducers/statReducer.ts';
import loginReducer from './reducers/loginReducer.ts';

// Reducers for states
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