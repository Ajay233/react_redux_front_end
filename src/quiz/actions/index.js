import { get } from '../../axiosRequests/requests';

export const setQuizes = (quizes) => {
  return {
    type: "SET_QUIZES",
    payload: quizes
  }
}

export const setAllQuizes = (endpoint, data, token) => {
  return (dispatch) => {
    get(endpoint, data, token).then((response) => {
      console.log(response)
      dispatch({
        type: "SET_ALL_QUIZES",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response)
    });
  }
}
