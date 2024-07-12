import { SET_USER, SET_CHANNEL } from "./actiontypes";
import { combineReducers } from "@reduxjs/toolkit";

// Initial state
let defaultUserState = {
    currentUser: null
};

// User reducer
const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

const defaultChannelState =  {
  currentChannel : null,
}

const channelReducer = (state = defaultChannelState, action) => {
  switch (action.type) {
    case SET_CHANNEL :
      return {
        ...state,
        currentChannel: action.payload
      };
    default:
      return state;
  }
};

// Combine reducers
const combinedReducers = combineReducers({
  user: userReducer,
  channel : channelReducer,
});

export default combinedReducers;
