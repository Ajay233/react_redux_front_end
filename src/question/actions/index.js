import { getUsingParams } from '../../axiosRequests/requests'
import { sessionExpired } from '../../utils/session'

export const getQuestions = (endpoint, param, jwt, startQuiz=false, getAnswers, setCurrentQuestion) => {
  return (dispatch) => {
    getUsingParams(endpoint, param, jwt).then((response) => {
      dispatch({
        type: "SET_QUESTIONS",
        payload: response.data
      })
      if(startQuiz){
        const body = { questionId: response.data[0].id }
        getAnswers("answer/findByQuestionId", body, jwt)
        setCurrentQuestion(response.data[0]);
      }
      console.log("success")
    }).catch((error) => {
      console.log(error);
      if(error.response.status === 403){
        sessionExpired(dispatch);
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
