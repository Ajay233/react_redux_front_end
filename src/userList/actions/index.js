import { get } from '../../axiosRequests/requests'
import { sessionExpired } from '../../utils/session'

export const setUserList = (endpoint, data, token) => {
  return (dispatch) => {
    get(endpoint, data, token).then((response) => {
      dispatch({
        type: "SET_USER_LIST",
        payload: response.data
      })
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(dispatch);
      }
    })
  }
}
