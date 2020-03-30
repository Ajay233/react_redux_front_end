import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  setUserReducer,
  setVerificationProcessStatus,
  setRedirectReducer
} from './authentication/reducers/index'
import { setNotificationReducer } from './notifications/reducers/index'
import { setUserListReducer } from './userList/reducers/index'


export default combineReducers({
  userData: setUserReducer,
  verificationProcess: setVerificationProcessStatus,
  redirect: setRedirectReducer,
  notificationData: setNotificationReducer,
  listOfUsers: setUserListReducer,
  form: formReducer
});
