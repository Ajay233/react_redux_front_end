import { getUsingParams } from '../../axiosRequests/requests'

export const getQuestions = (endpoint, param, jwt) => {
  return (dispatch) => {
    getUsingParams(endpoint, param, jwt).then((response) => {
      dispatch({
        type: "SET_QUESTIONS",
        payload: response.data
      })
      console.log("success")
    }).catch((error) => {
      console.log(error);
    });
  }
}
