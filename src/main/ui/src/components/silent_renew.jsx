import React from 'react';
import { connect } from 'react-redux';
import { processSilentRenew } from 'redux-oidc';

class SilentRenewPage extends React.Component {

  componentDidMount(){
    console.log('Component did mount.');
    processSilentRenew();
  }

  componentDidUpdate(){
    console.log('Component did update.');
    processSilentRenew();
  }

  render() {
    return (
        <div>
          Silent renew...
        </div>
    );
  }
}

export default connect(null, null)(SilentRenewPage);
