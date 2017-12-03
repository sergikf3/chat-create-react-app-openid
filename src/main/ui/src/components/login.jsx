import React from 'react';
import '../styles/login.css';
import { connect } from 'react-redux';
import userManager from '../utils/userManager';
import PropTypes from 'prop-types';

class Login extends React.Component {

  //onLoginButtonClick = (event) => {
  onLoginButtonClick(event) {
    event.preventDefault();
    console.log('Sso Initialization');
    userManager.signinRedirect();
  }

  componentDidMount() {
    console.log('Login did mount');
    //const { user } = this.props;
    userManager.getUser()
      .then(
      (user) => {
        //console.log('user:' , user);
        if(user != null){
        console.log("signed in", user.profile.name);
        //userManager.signinRedirect();
        this.context.router.history.push('/refresh');
        }
      }
      )
      .catch((error) => {
        console.log('error:', error)
      });
  }


  render() {
    return (
      <div className="container">
        <div className="panel panel-default card card-container">
          <button className="btn btn-lg btn-success btn-block" onClick={this.onLoginButtonClick.bind(this)}>Google Login</button>
        </div>
      </div>
    )
  }
}

Login.contextTypes = {
  router: PropTypes.object
}


function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}


export default connect(mapStateToProps, null)(Login);

