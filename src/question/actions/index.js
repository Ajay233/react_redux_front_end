import { getUsingParams } from '../../axiosRequests/requests'
import { getAnswers } from '../../answer/actions'
import { sessionExpired } from '../../utils/session'
import { setNotification } from '../../notifications/actions'

export const getQuestions = (endpoint, param, jwt, startQuiz=false) => {
  return (dispatch) => {
    return getUsingParams(endpoint, param, jwt).then((response) => {
      if(response.data !== "NO QUESTIONS"){
        dispatch({
          type: "SET_QUESTIONS",
          payload: response.data
        })
      }
      if(startQuiz){
        const body = { questionId: response.data[0].id }
        dispatch(getAnswers("answer/findByQuestionId", body, jwt))
        dispatch(setCurrentQuestion(response.data[0]));
      }
      console.log("success")
    }).catch((error) => {
      console.log(error);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification(error.response.data, "error", true))
      }
    });
  }
}

export const setCurrentQuestion = (question) => {
  return {
    type: "SET_CURRENT_QUESTION",
    payload: question
  }
}

export const deleteQuestion = (question) => {
  return {
    type: "DELETE_QUESTION",
    payload: question
  }
}

export const addQuestion = (question) => {
  return {
    type: "ADD_QUESTION",
    payload: question
  }
}

export const updateQuestion = (question) => {
  return {
    type: "UPDATE_QUESTION",
    payload: question
  }
}

export const clearQuestions = () => {
  return {
    type: "CLEAR_QUESTIONS",
    payload: []
  }
}
