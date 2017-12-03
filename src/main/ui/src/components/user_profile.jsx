import React, { Component }  from 'react';
import { connect } from 'react-redux';
import '../styles/profile.css';
import PropTypes from 'prop-types';

class UserProfile extends Component {
  render() {
    return (
      <div className="list-group user-profile">
        <div className="list-group-item">
          <img alt="" src={this.props.user.avatar} className="img-responsive img-circle center-block profile-image" />
        </div>
        <div className="list-group-item">
          <p className="text-center">{this.props.user.alias}</p>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object
}

export default connect(({user}) => ({user}))(UserProfile);
