import { verificationProcess } from '../factory/verificationFactory'
import { user } from '../factory/userFactory'

export const setUserReducer = (userData=user, action) => {
  switch (action.type) {
    case "SET_USER_LOGGED_IN": return action.payload;
    case "LOG_OUT_USER": return action.payload;
    default: return userData;
  }
  // if(action.type === "SET_USER_LOGGED_IN"){
  //   return action.payload;
  // } else if (action.type === "LOG_OUT_USER"){
  //   return action.payload;
  // } else {
  //   return userData;
  // }
}

export const setVerificationProcessStatus = (verificationProcessStatus=verificationProcess, action) => {
  if(action.type === "SET_VERIFY_PROCESS_STATUS"){
    return action.payload;
  } else {
    return verificationProcessStatus;
  }
}

export const setRedirectReducer = (status={status: false}, action) => {
  if(action.type === "SET_REDIRECT"){
    return action.payload
  } else {
    return status
  }
}
