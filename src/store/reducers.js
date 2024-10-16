import { SET_USER, SET_CHANNEL, SET_LOADING, SET_FAVOURITECHANNEL, REMOVE_FAVOURITECHANNEL } from "./actiontypes";
import { combineReducers } from "@reduxjs/toolkit";

// Initial state for the user
const defaultUserState = {
  currentUser: null,
};

// User reducer
const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

// Initial state for the channel
const defaultChannelState = {
  currentChannel: null,
  loading: false,
};

// Channel reducer
const channelReducer = (state = defaultChannelState, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state;
  }
};

// Initial state for favourite channels
const defaultFavouriteChannelState = {
  favouriteChannel: {},
};

// Favourite channel reducer
const favouriteChannelReducer = (state = defaultFavouriteChannelState, action) => {
  switch (action.type) {
    case SET_FAVOURITECHANNEL: {
      const { channelId, channelName } = action.payload.favouriteChannel;
      return {
        favouriteChannel: {
          ...state.favouriteChannel,
          [channelId]: channelName,
        },
      };
    }
    case REMOVE_FAVOURITECHANNEL: {
      const { channelId } = action.payload.favouriteChannel;
      const updatedFavouriteChannel = { ...state.favouriteChannel };
      delete updatedFavouriteChannel[channelId];
      return {
        favouriteChannel: updatedFavouriteChannel,
      };
    }
    default:
      return state;
  }
};

// Combine reducers
const combinedReducers = combineReducers({
  user: userReducer,
  channel: channelReducer,
  favouriteChannel: favouriteChannelReducer,
});

export default combinedReducers;
