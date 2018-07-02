import React, { Component } from 'react';
import { connect } from 'react-redux';
import HumanizedTime from './humanized_time';
import '../styles/messages.css';
import PropTypes from 'prop-types';

class Messages extends Component {

  renderMessages() {
    return this.props.messages.map(message => {
      const delta_val = (this.props.stats[message.user.alias]) ? this.props.stats[message.user.alias].delta : message.timestamp;
      return (
        <div key={message.id} className="list-group-item">
          <div className="media">
            <div className="media-left">
              <img alt="" className="media-object img-circle" src={message.user.avatar} />
            </div>
            <div className="media-body">
              <div className="row">
                <div className="col-md-2 text-left text-info">
                  {message.user.alias}
                </div>
                <div className="col-md-8 text-left">{message.message}</div>
                <div className="col-md-2 text-right text-info">
                  <small><HumanizedTime date={message.timestamp} /><span>
                    {message.timestamp - delta_val > 0 ? '(new)' : '(stale)'}</span></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  /*
                    <small><HumanizedTime date={message.timestamp}/><span>
                       {message.timestamp - message.delta > 0 ? '(new)' : '(stale)'}</span></small>
 */

  render() {
    return (
      <div className="list-group chat-messages panel">
        {this.renderMessages()}
        <div ref={(div) => {
          if (div) div.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }}></div>
      </div>
    );
  }

}

Messages.propTypes = {
  messages: PropTypes.object,
  stats: PropTypes.object
}

function mapStateToProps(state) {
  return { messages: state.messages, stats: state.stats };
}

export default connect(mapStateToProps)(Messages);
