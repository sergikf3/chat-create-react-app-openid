export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';
export const WEBSOCKET_CONNECT_SEND = 'WEBSOCKET_CONNECT_SEND';


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
  let i;
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


function factory({ messageToActionAdapter }) {

  let socket = new NullSocket();

  return ({ dispatch }) => {
    return next => action => {

      switch (action.type) {
        case WEBSOCKET_CONNECT:
          socket = new WebSocket(action.payload.url);
          socket.onmessage = (msg) => {
            dispatch(messageToActionAdapter(msg) || { type: WEBSOCKET_MESSAGE, payload: msg.data });
          }
          break;
        case WEBSOCKET_SEND:
          //socket.send(JSON.stringify(action.payload));
          sendMessageAsync(socket, JSON.stringify(action.payload))
          break;
        //case WEBSOCKET_CONNECT_SEND:
        //  socket = new WebSocket(action.payload.payload.url);
        //  sendMessageAsync(socket, JSON.stringify(action.payload))
        //  break;
        default:
        // do nothing
      }
      return next(action);
    }
  }
}
export default factory;

