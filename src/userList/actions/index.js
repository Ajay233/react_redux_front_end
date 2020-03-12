import { get, setHeader } from '../../axiosRequests/requests'

export const setUserList = (endpoint, data, token) => {
  return (dispatch) => {
    get(endpoint, data, token).then((response) => {
      dispatch({
        type: "SET_USER_LIST",
        payload: {
          response: response
        }
      })
    }).catch((error) => {
      dispatch({
        type: "SET_USER_LIST",
        payload: {
          error: error
        }
      })
    })
  }
}
