import { getUsingParams, post, put, del } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'
import { sessionExpired } from '../../utils/session'
import history from '../../history'

// create
export const addAnswer = (data, jwt) => {
  return (dispatch) => {
    return post("answer/create", [data], jwt).then((response) => {
      dispatch({
        type: "ADD_ANSWER",
        payload: response.data[0]
      })
      history.push("/editQuestion");
      dispatch(setNotification("Answer created", "success", true));
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        console.log(error.response);
        dispatch(setNotification("Error - unable to create answer", "error", true));
      }
    });
  }
}

export const getAnswers = (endpoint, param, jwt) => {
  return (dispatch) => {
    return getUsingParams(endpoint, param, jwt).then((response) => {
      dispatch({
        type: "SET_ANSWERS",
        payload: response.data
      });
    }).catch((error) => {
      dispatch(setNotification("Error retrieving answers", "error", true));
    });
  }
}

// update

// delete

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

export const updateAnswer = (answer) => {
  return {
    type: "UPDATE_ANSWER",
    payload: answer
  }
}
