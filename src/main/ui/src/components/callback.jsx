import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../utils/userManager';
import PropTypes from 'prop-types';
import {
  USER_JOINED, WEBSOCKET_SEND, USER_JOINED_BACKEND
} from '../actions/chat';

const DEFAULT_AVATAR = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';

class CallbackPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { alias: '', avatar: DEFAULT_AVATAR }
  }

  successCallback = () => {
    if (this.props.user !== null) {
      console.log("signed in", this.props.user.profile.name);
      let alias = this.props.user.profile.name;
      console.log("callback - signed in", alias);
      const avatar = alias ? encodeURI(`https://robohash.org/${alias.toLowerCase()}.png`) : DEFAULT_AVATAR;
      this.setState({ avatar });
      this.props.mapDispatchToProps({ alias, avatar }, `ws://${window.location.host}/websocket/chat`);

      this.context.router.history.push('/chat');
    } else {
      this.handleLogout();
    }
  }

  render() {
    // just redirect to '/' in both cases
    return (
      <CallbackComponent userManager={userManager} successCallback={this.successCallback} errorCallback={this.successCallback}>
        <div>
          Redirecting...
        </div>
      </CallbackComponent>
    );
  }
}

CallbackPage.contextTypes = {
  router: PropTypes.object
}

CallbackPage.propTypes = {
  user: PropTypes.object,
  mapDispatchToProps: PropTypes.func
}


function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

function mapDispatchToProps(user, url) {
  return function (dispatch)  {
    dispatch({
      type: USER_JOINED,
      payload: { user: user, url: url } 
    });
    dispatch({
      type: WEBSOCKET_SEND,
      payload: { 
        type: USER_JOINED_BACKEND,
        payload: { user: user, url: url } 
        }
    });    
  }
}

export default connect(mapStateToProps, {mapDispatchToProps})(CallbackPage);
