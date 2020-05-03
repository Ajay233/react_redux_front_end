import { getUsingParams } from '../../axiosRequests/requests'

export const setQuiz = (quiz) => {
  console.log(quiz)
  return {
    type: "SET_QUIZ",
    payload: quiz
  }
}

export const getQuestions = (endpoint, param, jwt, setNotification) => {
  return (dispatch) => {
    getUsingParams(endpoint, param, jwt).then((response) => {
      dispatch({
        type: "SET_QUESTIONS",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response);
      setNotification(error.response.data, "error", true)
    })
  }
}
