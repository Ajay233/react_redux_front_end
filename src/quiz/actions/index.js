import { get, getUsingParams } from '../../axiosRequests/requests';

export const setQuizes = (quizes) => {
  return {
    type: "SET_QUIZES",
    payload: quizes
  }
}

export const getAllQuizes = (endpoint, data, token) => {
  return (dispatch) => {
    get(endpoint, data, token).then((response) => {
      console.log(response)
      dispatch({
        type: "GET_ALL_QUIZES",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response)
    });
  }
}

export const getQuizSearchResults = (endpoint, data, token, setNotification, errorMsg) => {
  return (dispatch) => {
    getUsingParams(endpoint, data, token).then((response) => {
      dispatch({
        type: "SET_QUIZ_SEARCH_RESULTS",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response);
      setNotification(errorMsg, "error", true);
    })
  }
}
