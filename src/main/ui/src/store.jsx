import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import websocket from './middleware/websocket';
import reducers from './reducers';
import { routerMiddleware } from 'react-router-redux';

import { loadUser } from 'redux-oidc';
import userManager from './utils/userManager';

import createHistory from 'history/createBrowserHistory'

export const history = createHistory()


const initialState = {};
const appliedMiddleware = applyMiddleware(reduxThunk, routerMiddleware(history), websocket());
const createStoreWithMiddleware = appliedMiddleware(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

// load the current user into the redux store
loadUser(store, userManager);

export default store;
