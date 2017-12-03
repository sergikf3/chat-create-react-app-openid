import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './App'
import { OidcProvider } from 'redux-oidc';
import userManager from './utils/userManager';

import registerServiceWorker from './registerServiceWorker';

const target = document.querySelector('#root')

render(
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <ConnectedRouter history={history}>
                <div>
                    <App />
                </div>
            </ConnectedRouter>
        </OidcProvider>
    </Provider>,
    target
)

registerServiceWorker();
