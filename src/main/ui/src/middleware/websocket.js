 import {
  WEBSOCKET_CONNECT, WEBSOCKET_MESSAGE, WEBSOCKET_SEND,
  USER_LEFT, USER_STATS,
  CHAT_MESSAGE, MESSAGE_RECEIVED
} from '../actions/chat';

class NullSocket {
  send() {
    console.log(`Warning: send called on NullSocket, dispatch a ${WEBSOCKET_CONNECT} first`);
  }
}


function delay(t) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t)
  });
}

const NUM_RETRIES = 3;

async function sendMessageAsync(socket, message) {
  let i = 0;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await delay(50);
      if (socket.readyState === 1) {
        console.log("Connection is made");
        socket.send(message);
        break;
      }
    } catch (error) {
      console.log('error: ' + error);
    }
  }
  console.log(i);
}

function factory() {
  let socket = new NullSocket();

  return function ({ dispatch }) {
    return function (next) {
      return function (action) {
        switch (action.type) {
          case WEBSOCKET_CONNECT:
            socket = new WebSocket(action.payload.url);
            socket.onmessage = (msg) => {
              const event = JSON.parse(msg.data);
              switch (event.type) {
                case CHAT_MESSAGE:
                  dispatch({
                    type: MESSAGE_RECEIVED,
                    payload: { id: event.id, timestamp: event.timestamp, user: event.payload.user, message: event.payload.message }
                  });
                  break;
                case USER_STATS:
                  dispatch({
                    type: USER_STATS,
                    payload: event.payload
                  });
                  break;
                case USER_LEFT:
                  dispatch({
                    type: USER_LEFT,
                    payload: event.payload
                  });
                  break;
                default:
                  dispatch({
                    type: WEBSOCKET_MESSAGE,
                    payload: msg.data
                  });
              }
            }
            break;
          case WEBSOCKET_SEND:
            sendMessageAsync(socket, JSON.stringify(action.payload))
            break;
          default:
          // do nothing
        }
        return next(action);
      }
    }
  }
}
export default factory;

