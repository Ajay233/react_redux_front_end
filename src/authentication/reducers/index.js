import { combineReducers } from 'redux';

export const setUserReducer = (userData={}, action) => {
  if(action.type === "SET_USER"){
    return [action.payload];
  } else if (action.type === "LOG_OUT_USER"){
    return {};
  } else {
    return userData;
  }
}

export const setJwtReducer = (jwt="", action) => {
  if(action.type === "SET_JWT"){
    return action.payload;
  } else {
    return jwt;
  }
}

export const setLoggedInReducer = (loggedIn=false, action) => {
  if(action.type === "SET_LOGGED_IN"){
    return action.payload;
  } else {
    return loggedIn;
  }
}

export default combineReducers({
  user: setUserReducer,
  jwt: setJwtReducer,
  loggedIn: setLoggedInReducer
});
