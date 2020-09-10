import { get, del } from '../../axiosRequests/requests'
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

export const deleteUser = (config, jwt) => {
  return (dispatch) => {
    del("users/deleteAccount", config, jwt).then((response) => {
      dispatch({
        type: "DELETE_USER_FROM_LIST",
        payload: config.data.id
      })
      dispatch(setNotification("Account deleted", "success", true));
    }).catch((error) => {
      console.log(error.response)
      dispatch(setNotification("Error - Account could not be deleted", "error", true));
    });
  }
}

export const clearUserList = () => {
  return {
    type: "CLEAR_USER_LIST",
    payload: []
  }
}
