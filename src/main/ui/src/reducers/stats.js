import { USER_STATS, USER_LEFT, MESSAGE_RECEIVED, USER_JOINED_BACKEND } from '../actions/chat';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_STATS:
      return { ...action.payload.stats };
    case USER_LEFT:
      //const oldMessageCount = state[action.payload.user.alias].messageCount
      return Object.values(state)
        .filter(
          stat => stat.user.alias !== action.payload.user.alias
        )
        .reduce(
          function (acc, val) {
            return ({ ...acc, [val.user.alias]: val })
          },
          {});
    case MESSAGE_RECEIVED:
      //const { payload: { user: { alias }, timestamp, delta }, payload: { user } } = action;
      {
        const user = action.payload.user;
        const alias = user.alias;
        const timestamp = action.payload.timestamp;
        //const delta = action.payload.delta;
        const delta = state[alias] ? state[alias].delta : action.payload.delta;
        const messageCount = state[alias] ? state[alias].messageCount + 1 : 1;
        return { ...state, [alias]: { user: user, lastMessage: timestamp, messageCount: messageCount, delta: delta } }
      }
    case USER_JOINED_BACKEND:
      {
        const user = action.payload.user;
        const alias = user.alias;
        const delta = state[alias] ? state[alias].delta : action.payload.delta;
        const messageCount = 0;
        return { ...state, [alias]: { user: user, lastMessage: delta, messageCount: messageCount, delta: delta } }
      }     
    default: return state;
  }
}
