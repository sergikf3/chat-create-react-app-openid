import { USER_STATS, USER_LEFT, MESSAGE_RECEIVED, USER_JOINED_BACKEND } from '../actions/chat';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_STATS:
      return { ...action.payload.stats };
    case USER_LEFT:
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
      //const { payload: { user: { alias }, timestamp, loginTime }, payload: { user } } = action;
      {
        const user = action.payload.user;
        const alias = user.alias;
        const timestamp = action.payload.timestamp;
         const loginTime = state[alias] ? state[alias].loginTime : action.payload.timestamp;
        //const loginTime = state[alias].loginTime;
        const messageCount = state[alias] ? state[alias].messageCount + 1 : 1;
        return { ...state, [alias]: { user: user, lastMessage: timestamp, messageCount: messageCount, loginTime: loginTime } }
      }
    case USER_JOINED_BACKEND:
      {
        const user = action.payload.user;
        const alias = user.alias;
        const loginTime = state[alias] ? state[alias].loginTime : action.payload.loginTime;
        return { ...state, [alias]: { user: user, lastMessage: loginTime, messageCount: 0, loginTime: loginTime } }
      }     
    default: return state;
  }
}
