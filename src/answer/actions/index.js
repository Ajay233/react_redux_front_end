import { getUsingParams, post, put, del } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'
import { hideModal } from '../../modal/actions'
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

// read
export const getAnswers = (param, jwt) => {
  return (dispatch) => {
    return getUsingParams("answer/findByQuestionId", param, jwt).then((response) => {
      dispatch({
        type: "SET_ANSWERS",
        payload: response.data
      });
    }).catch((error) => {
      dispatch(setNotification("Error retrieving answers", "error", true));
    });
  }
}

// update (there was a call to setCurrentAnswer but have removed this as it's not needed)
export const updateAnswer = (body, jwt) => {
  return (dispatch) => {
    return put("answer/update", [body], jwt).then((response) => {
      dispatch({
        type: "UPDATE_ANSWER",
        payload: response.data[0]
      })
      history.push("/editQuestion");
      dispatch(setNotification("Answer updated", "success", true));
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - unable to update answer", "error", true));
      }
    });
  }
}

// delete
export const deleteAnswer = (config, jwt) => {
  return (dispatch) => {
    return del("answer/delete", config, jwt).then((response) => {
      dispatch(hideModal())
      dispatch({
        type: "DELETE_ANSWER",
        payload: config.data[0]
      })
      dispatch(setNotification("Answer deleted", "success", true));
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(hideModal())
        dispatch(setNotification("Error - Unable to delete this answer", "error", true))
      }
    });
  }
}

export const setCurrentAnswer = (answer) => {
  return {
    type: "SET_CURRENT_ANSWER",
    payload: answer
  }
}
