import { SET_USER, SET_CHANNEL } from "./actiontypes";

export const setUser = (user) => {
  const serializableUser = user ? {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL
  } : null;
  
  return {
    type: SET_USER,
    payload: serializableUser
  };
};

export const setChannel = (channel) => {
  const serializableUser = channel ? {
    id: channel.id,
    name: channel.name,
    description: channel.description,
    created_by : {
      name : channel.displayName,
      avatar : channel.photoURL
    }
  } : null;
  
  return {
    type: SET_CHANNEL,
    payload: serializableUser
  };
};