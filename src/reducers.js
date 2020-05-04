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
import { setQuestionsReducer, setCurrentQuestionReducer } from './question/reducers'
import { setAnswersReducer, setCurrentAnswerReducer } from './answer/reducers'
import { showModalReducer } from './modal/reducers'


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
  currentQuestion: setCurrentQuestionReducer,
  answers: setAnswersReducer,
  currentAnswer: setCurrentAnswerReducer,
  showModal: showModalReducer,
  form: formReducer
});
