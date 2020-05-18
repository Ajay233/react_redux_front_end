import { get } from '../../axiosRequests/requests'
import { sessionExpired } from '../../utils/session'
import { setNotification } from '../../notifications/actions'

export const setUserList = (endpoint, data, token) => {
  return (dispatch) => {
    return get(endpoint, data, token).then((response) => {
      dispatch({
        type: "SET_USER_LIST",
        payload: response.data
      })
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - unable to get user list", "error", true));
      }
    })
  }
}

export const clearUserList = () => {
  return {
    type: "CLEAR_USER_LIST",
    payload: []
  }
}
