import { verificationProcess } from '../factory/verificationFactory'
import { user } from '../factory/userFactory'

export const setUserReducer = (userData=user, action) => {
  switch (action.type) {
    case "SET_USER_LOGGED_IN": return action.payload;
    default: return userData;
  }
}

export const setVerificationProcessStatus = (verificationProcessStatus=verificationProcess, action) => {
  switch (action.type) {
    case "SET_VERIFY_PROCESS_STATUS": return action.payload;
    default: return verificationProcessStatus;
  }
}

export const setRedirectReducer = (status={status: false}, action) => {
  switch (action.type) {
    case "SET_REDIRECT": return action.payload;
    default: return status
  }
}
