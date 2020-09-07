import { getUsingParams, post, put, del } from '../../axiosRequests/requests'
import { getAnswers } from '../../answer/actions'
import { sessionExpired } from '../../utils/session'
import { setNotification } from '../../notifications/actions'
import history from '../../history'

export const addQuestion = (body, jwt) => {
  return (dispatch) => {
    return post("question/create", [body], jwt).then((response) => {
      dispatch({
        type: "ADD_QUESTION",
        payload: response.data[0]
      })
      history.push("/editQuiz");
      dispatch(setNotification("Question created", "success", true));
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        console.log(error.response);
        dispatch(setNotification("Error - unable to create question with the details provided", "error", true))
      }
    });
  }
}

export const getQuestions = (endpoint, param, jwt, startQuiz=false) => {
  return (dispatch) => {
    return getUsingParams(endpoint, param, jwt).then((response) => {
      if(response.data !== "NO QUESTIONS"){
        dispatch({
          type: "SET_QUESTIONS",
          payload: response.data
        })
      } else {
        dispatch({
          type: "SET_QUESTIONS",
          payload: []
        })
      }
      if(startQuiz){
        const body = { questionId: response.data[0].id }
        dispatch(getAnswers(body, jwt))
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

export const updateQuestion = (body, jwt) => {
  return (dispatch) => {
    return put("question/update", [body], jwt).then((response) => {
      dispatch(setCurrentQuestion(response.data[0]));
      dispatch({
        type: "UPDATE_QUESTION",
        payload: response.data[0]
      })
      dispatch(setNotification("Question updated", "success", true))
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - unable to update question", "error", true))
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

export const clearQuestions = () => {
  return {
    type: "CLEAR_QUESTIONS",
    payload: []
  }
}
