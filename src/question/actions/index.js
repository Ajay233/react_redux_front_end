import { getUsingParams } from '../../axiosRequests/requests'

export const getQuestions = (endpoint, param, jwt) => {
  return (dispatch) => {
    getUsingParams(endpoint, param, jwt).then((response) => {
      dispatch({
        type: "SET_QUESTIONS",
        payload: response.data
      })
      console.log("success")
    }).catch((error) => {
      console.log(error);
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
