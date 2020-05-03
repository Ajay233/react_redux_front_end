import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  setUserReducer,
  setVerificationProcessStatus,
  setRedirectReducer
} from './authentication/reducers/index'
import { setNotificationReducer } from './notifications/reducers/index'
import { setUserListReducer } from './userList/reducers/index'
import { setUserResultsReducer } from './editUserPrivilege/reducers'
import { setQuizSearchReducer } from './quizSearch/reducers'
import { setQuizReducer } from './quiz/reducers'
import { setQuestionsReducer } from './question/reducers'


export default combineReducers({
  userData: setUserReducer,
  verificationProcess: setVerificationProcessStatus,
  redirect: setRedirectReducer,
  notificationData: setNotificationReducer,
  userResults: setUserResultsReducer,
  listOfUsers: setUserListReducer,
  quizes: setQuizSearchReducer,
  quiz: setQuizReducer,
  questions: setQuestionsReducer,
  form: formReducer
});
