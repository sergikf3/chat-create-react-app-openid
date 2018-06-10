//import { createStore, applyMiddleware, compose } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import websocket from './middleware/websocket';
import reducers from './reducers';

//import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

//import { messageToActionAdapter } from './actions/chat';

import { loadUser } from 'redux-oidc';
import userManager from './utils/userManager';

import createHistory from 'history/createBrowserHistory'

export const history = createHistory()


const initialState = {};
//const appliedMiddleware = applyMiddleware(reduxThunk, routerMiddleware(history), websocket({ messageToActionAdapter }));
const appliedMiddleware = applyMiddleware(reduxThunk, routerMiddleware(history), websocket());
const createStoreWithMiddleware = appliedMiddleware(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

// load the current user into the redux store
loadUser(store, userManager);

export default store;
