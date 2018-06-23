import React from 'react';
import { WEBSOCKET_SEND, CHAT_MESSAGE } from '../actions/chat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MessageInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  onInputChange(message) {
    this.setState({message});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.mapDispatchToProps(this.props.user, this.state.message);
    this.setState({message:''});
    return false;
  }

  render() {
    return (

      <div className="container-fluid">
        <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">Type Message</div>
              <input type="text"
                value={this.state.message}
                onChange={event => this.onInputChange(event.target.value)}
                className="form-control input-lg"></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

MessageInput.propTypes = {
  user: PropTypes.object,
  mapStateToProps: PropTypes.func,
  mapDispatchToProps: PropTypes.func
}

function mapDispatchToProps(user, message) {
  return function (dispatch)  {
    dispatch({
      type: WEBSOCKET_SEND,
      payload: { 
        type: CHAT_MESSAGE, 
        payload: { user: user, message: message } 
      }
    });    
  }
}

//const mapStateToProps1 = ({user}) =>  ({user}) ;
const mapStateToProps2 = (state) =>  ({user: state.user}) ;

/*
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
*/

//export default connect(({user}) => ({user}), { mapDispatchToProps })(MessageInput);
export default connect(mapStateToProps2, { mapDispatchToProps })(MessageInput);
