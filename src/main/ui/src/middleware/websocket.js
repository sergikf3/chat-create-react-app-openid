export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';
export const WEBSOCKET_CONNECT_SEND = 'WEBSOCKET_CONNECT_SEND';

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const USER_JOINED = 'USER_JOINED';
export const USER_STATS = 'USER_STATS';
export const USER_LEFT = 'USER_LEFT';

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

function messageToActionAdapter(msg) {
  const eventToActionAdapters = {
    CHAT_MESSAGE: ({ id, timestamp, payload: { user, message } }) =>
      ({ type: MESSAGE_RECEIVED, payload: { id, timestamp, user, message } }),
    USER_STATS: ({ payload }) => ({ type: USER_STATS, payload }),
    USER_LEFT: ({ payload }) => ({ type: USER_LEFT, payload })
  };
  const event = JSON.parse(msg.data);

  if (eventToActionAdapters[event.type]) {
    return eventToActionAdapters[event.type](event);
  }
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
              const actionMessage = messageToActionAdapter(msg) || { type: WEBSOCKET_MESSAGE, payload: msg.data };
              dispatch(actionMessage);
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

