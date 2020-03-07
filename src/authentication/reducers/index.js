import { combineReducers } from 'redux';
import { verificationProcess } from '../factory/verificationFactory'

export const setUserReducer = (userData={}, action) => {
  if(action.type === "SET_USER_LOGGED_IN"){
    return action.payload;
  } else if (action.type === "LOG_OUT_USER"){
    return {};
  } else {
    return userData;
  }
}

export const setVerificationProcessStatus = (verificationProcessStatus=verificationProcess, action) => {
  if(action.type === "SET_VERIFY_PROCESS_STATUS"){
    return action.payload;
  } else {
    return verificationProcessStatus;
  }
}

// export const setJwtReducer = (jwt="", action) => {
//   if(action.type === "SET_JWT"){
//     return action.payload;
//   } else {
//     return jwt;
//   }
// }

// export const setLoggedInReducer = (loggedIn=false, action) => {
//   if(action.type === "SET_LOGGED_IN"){
//     return action.payload;
//   } else {
//     return loggedIn;
//   }
// }

export default combineReducers({
  userData: setUserReducer,
  verificationProcess: setVerificationProcessStatus
});
