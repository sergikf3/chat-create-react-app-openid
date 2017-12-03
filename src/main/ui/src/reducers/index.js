import { combineReducers } from 'redux';
import MessagesReducer from './messages';
import UserReducer from './user';
import TimeReducer from './time';
import UserStatsReducer from './stats';
import { reducer as oidcReducer } from 'redux-oidc';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  messages: MessagesReducer,
  user: UserReducer,
  time: TimeReducer,
  stats: UserStatsReducer,
  oidc: oidcReducer
});

export default rootReducer;
