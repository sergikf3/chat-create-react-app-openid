import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../utils/userManager';
import PropTypes from 'prop-types';

const DEFAULT_AVATAR = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';

class CallbackPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { alias: '', avatar: DEFAULT_AVATAR }
  }

  updateAvatar(alias) {
    const avatar = alias ? encodeURI(`https://robohash.org/${alias.toLowerCase()}.png`) : DEFAULT_AVATAR;
    this.setState({ avatar });
  }

  successCallback = () => {
    if (this.props.user !== null) {
      console.log("signed in", this.props.user.profile.name);
      let alias = this.props.user.profile.name;
      this.updateAvatar(alias);
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
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}


//export default connect(mapStateToProps, { joinChat })(CallbackPage);
export default connect(mapStateToProps, {})(CallbackPage);
