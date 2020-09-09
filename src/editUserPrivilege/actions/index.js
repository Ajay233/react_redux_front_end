import { getUsingParams } from '../../axiosRequests/requests'
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

export const clearUserResults = () => {
  return {
    type: "CLEAR_USER_RESULTS",
    payload: {}
  }
}
