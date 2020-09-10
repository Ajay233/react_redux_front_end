import { getUsingParams, put } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'
import { sessionExpired } from '../../utils/session'

export const setUserResults = (param, jwt) => {
  return (dispatch) => {
    return getUsingParams("users/findByEmail", param, jwt).then((response) => {
      dispatch({
        type: "SET_USER_RESULTS",
        payload: response.data
      })
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        const msg = error.response.data;
        dispatch(setNotification(msg, "error", true));
        console.log(error.response)
      }
    });
  }
}

export const updatePrivillege = (data, jwt) => {
  return (dispatch) => {
    return put("users/updatePermission", data, jwt).then((response) => {
      dispatch(clearUserResults());
      dispatch(setNotification("Permission level saved", "success", true));
    }).catch((error) => {
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        const errorMsg = error.response.data ? error.response.data : "Error - unable to update permission for this user"
        dispatch(setNotification(errorMsg, "error", true));
      }
    })
  }
}

export const clearUserResults = () => {
  return {
    type: "CLEAR_USER_RESULTS",
    payload: {}
  }
}
