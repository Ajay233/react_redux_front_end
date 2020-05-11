import { getUsingParams, put } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'
import { sessionExpired } from '../../utils/session'

export const setQuiz = (quiz) => {
  console.log(quiz)
  return {
    type: "SET_QUIZ",
    payload: quiz
  }
}

export const getQuestions = (endpoint, param, jwt, setNotification) => {
  return (dispatch) => {
    getUsingParams(endpoint, param, jwt).then((response) => {
      dispatch({
        type: "SET_QUESTIONS",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        setNotification(error.response.data, "error", true)
      }
    })
  }
}

export const updateQuizStatus = (data, jwt) => {
  return (dispatch) => {

    put("quiz/updateStatus", data, jwt).then((response) => {
      dispatch({
        type: "SET_STATUS",
        payload: response.data
      })
      dispatch(setNotification(`Quiz status updated to - ${response.data.status}`, "success", true))
    }).catch((error) => {
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - Unable to update quiz status", "error", true))
      }
    })
  }
}
