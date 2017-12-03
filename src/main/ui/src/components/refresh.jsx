import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../utils/userManager';
import configuration from '../utils/configuration';
import { joinChatForRefresh } from '../actions/chat';
import { connectToChatServer } from '../actions/chat';
import PropTypes from 'prop-types';
import { processSilentRenew } from 'redux-oidc';

const DEFAULT_AVATAR = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';

class RefreshPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { alias: '', avatar: DEFAULT_AVATAR }
  }

  handleLogout = function () {
    console.log('Slo Initialization');
    userManager.removeUser();
    var redirect = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    window.location = configuration.logoutUrl + redirect;
  }

  invokeChat = () => {
    if (this.props.user != null) {
      let alias = this.props.user.profile.name;
      console.log("signed in", alias);
      let avatar = alias ? encodeURI(`https://robohash.org/${alias.toLowerCase()}.png`) : DEFAULT_AVATAR;
      //this.props.connectToChatServer(`ws://${window.location.host}/websocket/chat`);
      this.props.joinChatForRefresh({ alias, avatar }, `ws://${window.location.host}/websocket/chat`);
      this.context.router.history.push('/chat');
    } else {
      this.handleLogout();
        //processSilentRenew();
    }
  }

  render() {
    // just redirect to '/' in both cases
    return (
      <CallbackComponent userManager={userManager} successCallback={this.invokeChat} errorCallback={this.invokeChat}>
        <div>
          Redirecting...
        </div>
      </CallbackComponent>
    );
  }
}

RefreshPage.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}


//export default connect(mapStateToProps, { joinChat })(RefreshPage);
//## Working ##
export default connect(mapStateToProps, { joinChatForRefresh, connectToChatServer })(RefreshPage);
//export default connect(mapStateToProps, { connectToChatServer })(RefreshPage);
//export default connect(mapStateToProps, { joinChatForRefresh })(RefreshPage);
