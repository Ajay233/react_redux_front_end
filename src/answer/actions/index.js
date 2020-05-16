import { getUsingParams } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'

export const getAnswers = (endpoint, param, jwt) => {
  return (dispatch) => {
    return getUsingParams(endpoint, param, jwt).then((response) => {
      dispatch({
        type: "SET_ANSWERS",
        payload: response.data
      });
    }).catch((error) => {
      setNotification("Error retrieving answers", "error", true)
    });
  }
}

export const setCurrentAnswer = (answer) => {
  return {
    type: "SET_CURRENT_ANSWER",
    payload: answer
  }
}

export const deleteAnswer = (answer) => {
  return {
    type: "DELETE_ANSWER",
    payload: answer
  }
}

export const addAnswer = (answer) => {
  return {
    type: "ADD_ANSWER",
    payload: answer
  }
}

export const updateAnswer = (answer) => {
  return {
    type: "UPDATE_ANSWER",
    payload: answer
  }
}
