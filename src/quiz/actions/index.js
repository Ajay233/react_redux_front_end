import { put } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'
import { sessionExpired } from '../../utils/session'

export const setQuiz = (quiz) => {
  return {
    type: "SET_QUIZ",
    payload: quiz
  }
}

export const updateQuizStatus = (endpoint, data, jwt) => {
  return (dispatch) => {

    return put(endpoint, data, jwt).then((response) => {
      dispatch({
        type: "SET_STATUS",
        payload: response.data
      })
      dispatch(setNotification(`Quiz status updated to - ${response.data.status}`, "success", true))
    }).catch((error) => {
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else if(error.response.status === 400){
        dispatch(setNotification(error.response.data, "error", true))
      } else {
        dispatch(setNotification("Error - Unable to update quiz status", "error", true))
      }
    })
  }
}
