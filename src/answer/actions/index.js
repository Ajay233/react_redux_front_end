import { getUsingParams, post, put, del } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'
import { hideModal } from '../../modal/actions'
import { sessionExpired } from '../../utils/session'
import { setLoaderState } from '../../components/actions'
import history from '../../history'

// create
export const addAnswer = (data, jwt) => {
  return (dispatch) => {
    dispatch(setLoaderState(true, "Saving...", "saving"))
    return post("answer/create", [data], jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch({
        type: "ADD_ANSWER",
        payload: response.data[0]
      })
      history.push("/editQuestion");
      dispatch(setNotification("Answer created", "success", true));
    }).catch((error) => {
      dispatch(setLoaderState())
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
    dispatch(setLoaderState(true, "Saving...", "saving"))
    return put("answer/update", [body], jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch({
        type: "UPDATE_ANSWER",
        payload: response.data[0]
      })
      history.push("/editQuestion");
      dispatch(setNotification("Answer updated", "success", true));
    }).catch((error) => {
      console.log(error.response);
      dispatch(setLoaderState())
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
    dispatch(hideModal())
    dispatch(setLoaderState(true, "Deleting..."))
    return del("answer/delete", config, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch({
        type: "DELETE_ANSWER",
        payload: config.data[0]
      })
      dispatch(setNotification("Answer deleted", "success", true));
    }).catch((error) => {
      console.log(error.response);
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
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
