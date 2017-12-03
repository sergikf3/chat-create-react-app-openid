import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TimeTicker from './components/time_ticker';
import Chat from './components/chat';
import Login from './components/login';
import requireUser from './components/require_user';
import { connectToChatServer } from './actions/chat';
import CallbackPage from './components/callback';
import RefreshPage from './components/refresh';
import SilentRenewPage from './components/silent_renew';
import PropTypes from 'prop-types';

class App extends Component {

  componentDidMount() {
    this.props.connectToChatServer(`ws://${window.location.host}/websocket/chat`);
  }

  render() {
    return (
      <Router >
        <div className="full-height">
          <TimeTicker />
          <Route exact path="/" component={Login} />
          <Route exact path="/chat" component={requireUser(Chat)} />
          <Route exact path="/callback" component={CallbackPage} />
          <Route exact path="/refresh" component={RefreshPage} />
          <Route exact path="/silent_renew" component={SilentRenewPage} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  connectToChatServer: PropTypes.func
}

export default connect(null, { connectToChatServer })(App);
