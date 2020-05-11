import { get, getUsingParams } from '../../axiosRequests/requests';
import { sessionExpired } from '../../utils/session'

export const setQuizes = (quizes) => {
  return {
    type: "SET_QUIZES",
    payload: quizes
  }
}

export const getAllQuizes = (endpoint, token) => {
  return (dispatch) => {
    get(endpoint, token).then((response) => {
      console.log(response)
      dispatch({
        type: "GET_ALL_QUIZES",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(dispatch);
      }
    });
  }
}

export const getQuizSearchResults = (endpoint, data, token, setNotification, errorMsg) => {
  return (dispatch) => {
    getUsingParams(endpoint, data, token).then((response) => {
      dispatch({
        type: "SET_QUIZ_SEARCH_RESULTS",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
      setNotification(errorMsg, "error", true);
      }
    })
  }
}

export const deleteQuiz = (quiz) => {
  return {
    type: "DELETE_QUIZ",
    payload: quiz
  }
}

export const addQuiz = (quiz) => {
  return {
    type: "ADD_QUIZ",
    payload: quiz
  }
}
