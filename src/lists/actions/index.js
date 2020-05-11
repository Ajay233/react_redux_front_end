import { get } from '../../axiosRequests/requests'
import { sessionExpired } from '../../utils/session'

export const getCategories = (jwt) => {
  return (dispatch) => {
    get("lookup/quizCategories", jwt).then((response) => {
      dispatch({
        type: "SET_CATEGORIES",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(dispatch);
      }
    })
  }
}
