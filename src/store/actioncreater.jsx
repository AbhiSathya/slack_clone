import { SET_USER, SET_CHANNEL, SET_FAVOURITECHANNEL, REMOVE_FAVOURITECHANNEL, SET_LOADING } from "./actiontypes";

// Action creator for setting the user
export const setUser = (user) => {
  const serializableUser = user
    ? {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    : null;

  return {
    type: SET_USER,
    payload: serializableUser,
  };
};

// Action creator for setting the channel
export const setChannel = (channel) => {
  const serializableChannel = channel
    ? {
      id: channel.id,
      name: channel.name,
      description: channel.description,
      isPrivateChat: channel.isPrivateChat,
      created_by: {
        name: channel.displayName,
        avatar: channel.photoURL,
      },
    }
    : null;

  return {
    type: SET_CHANNEL,
    payload: serializableChannel,
  };
};

// Action creator for setting a favourite channel
export const setFavouriteChannel = (channel) => {
  const serializableFavouriteChannel = channel
    ? {
      channelId: channel.id,
      channelName: channel.name,
    }
    : null;

  return {
    type: SET_FAVOURITECHANNEL,
    payload: {
      favouriteChannel: serializableFavouriteChannel,
    },
  };
};

// Action creator for removing a favourite channel
export const removeFavouriteChannel = (channel) => {
  const serializableFavouriteChannel = channel
    ? {
      channelId: channel.id,
    }
    : null;

  return {
    type: REMOVE_FAVOURITECHANNEL,
    payload: {
      favouriteChannel: serializableFavouriteChannel,
    },
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: {
      loading, // Wrap loading in an object for consistency
    },
  };
};
