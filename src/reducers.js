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
import { setListsReducer } from './lists/reducers'
import { setQuizProgressTracking } from './quizStart/reducers'
import { globalReducer } from './components/reducers'

export const rootReducer = (state, action) => {
  switch (action.type) {
    case "RESET_APP": return state = undefined;
    case "RESET_STATE": {
      const { userData, notificationData, lists } = state;
      return state = { userData, notificationData, lists }
    };
    default: return allReducers(state, action);
  }
}


export const allReducers = combineReducers({
  userData: setUserReducer,
  verificationProcess: setVerificationProcessStatus,
  redirect: setRedirectReducer,
  notificationData: setNotificationReducer,
  userResults: setUserResultsReducer,
  listOfUsers: setUserListReducer,
  quizProgressTracking: setQuizProgressTracking,
  quizes: setQuizSearchReducer,
  quiz: setQuizReducer,
  questions: setQuestionsReducer,
  currentQuestion: setCurrentQuestionReducer,
  answers: setAnswersReducer,
  currentAnswer: setCurrentAnswerReducer,
  modalState: showModalReducer,
  lists: setListsReducer,
  form: formReducer,
  globals: globalReducer
});
