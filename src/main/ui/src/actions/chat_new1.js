import { WEBSOCKET_CONNECT, WEBSOCKET_SEND } from '../middleware/websocket';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const USER_JOINED = 'USER_JOINED';
export const USER_STATS = 'USER_STATS';
export const USER_LEFT = 'USER_LEFT';

const eventToActionAdapters = {
  CHAT_MESSAGE: ({ id, timestamp, payload: { user, message } }) =>
    ({ type: MESSAGE_RECEIVED, payload: { id, timestamp, user, message } }),
  USER_STATS: ({ payload }) => ({ type: USER_STATS, payload }),
  USER_LEFT: ({ payload }) => ({ type: USER_LEFT, payload })
};

export function messageToActionAdapter(msg) {
  const event = JSON.parse(msg.data);
  //if (eventToActionAdapters[event.type] && event.type !== USER_LEFT && event.type !== USER_STATS) {
  if (eventToActionAdapters[event.type]) {
    return eventToActionAdapters[event.type](event);
  }
}

export function connectToChatServer(url) {
  return dispatch_func => {
    dispatch_func({ type: WEBSOCKET_CONNECT, payload: { url } });
  }
}

function overTheSocket(type, payload) {
  return {
    type: WEBSOCKET_SEND,
    payload: { type, payload }
  };
}

/*

function doubleDispatch(type, payload) {
  return dispatch_func => {
    dispatch_func({
      type: WEBSOCKET_SEND,
      payload: { type, payload }
    });
    dispatch_func({ type, payload });
  }
}
*/
function doubleDispatch(type, payload) {
  return dispatch_func => {
    dispatch_func(overTheSocket(type, payload));
    dispatch_func({ type, payload });
  }
}


export function sendMessage(user, message) {
  return dispatch_func => {
    dispatch_func(overTheSocket(CHAT_MESSAGE, { user, message }));
  }
}
/*
export function sendMessage(user, message) {
  let payload_message = { user, message };
  return dispatch_func => {
    dispatch_func({
      type: WEBSOCKET_SEND,
      payload: { CHAT_MESSAGE, payload_message }
    });
  }
}
*/
export function joinChat(user) {
  return doubleDispatch(USER_JOINED, { user });
}


/*
export function joinChat(user) {
  return dispatch_func => {
    dispatch_func({
      type: WEBSOCKET_SEND,
      payload: { type: USER_JOINED, payload: {user} }
    });
    dispatch_func({ type: USER_JOINED, payload: {user} });
  };
}
*/

export function joinChatForRefresh(user, url) {
  //const payload = { user, url } ;
  return dispatch_func => {
    dispatch_func({ type: USER_JOINED, payload: { user, url } });
  };
}


