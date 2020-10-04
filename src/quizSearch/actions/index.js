import { get, getUsingParams, del } from '../../axiosRequests/requests';
import { setNotification } from '../../notifications/actions'
import { sessionExpired } from '../../utils/session'
import { hideModal } from '../../modal/actions'

export const setQuizes = (quizes) => {
  return {
    type: "SET_QUIZES",
    payload: quizes
  }
}

export const getAllQuizes = (endpoint, token) => {
  return (dispatch) => {
    return get(endpoint, token).then((response) => {
      dispatch({
        type: "GET_ALL_QUIZES",
        payload: response.data
      })
    }).catch((error) => {
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - unable to get quiz list", "error", true));
      }

    });
  }
}

export const getQuizSearchResults = (endpoint, data, token, permission, errorMsg) => {
  return (dispatch) => {
    return getUsingParams(endpoint, data, token).then((response) => {
      let filteredQuizList = permission === "USER" ? response.data.filter(quiz => quiz.status === "READY") : response.data;
      dispatch({
        type: "SET_QUIZ_SEARCH_RESULTS",
        payload: filteredQuizList
      })
      if(filteredQuizList.length === 0){
         dispatch(setNotification(errorMsg, "error", true))
       }
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
      dispatch(setNotification(errorMsg, "error", true));
      }
    })
  }
}

export const deleteQuiz = (config, jwt) => {
  return (dispatch) => {
    return del("quiz/delete", config, jwt).then((response) => {
      dispatch(hideModal())
      dispatch({
        type: "DELETE_QUIZ",
        payload: config.data
      })
      dispatch(setNotification("Quiz deleted", "success", true))
    }).catch((error) => {
      console.log(error.response)
      dispatch(hideModal())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - Unable to delete this quiz", "error", true))
      }
    })
  }
}

export const addQuiz = (quiz) => {
  return {
    type: "ADD_QUIZ",
    payload: quiz
  }
}

export const clearQuizes = () => {
  return {
    type: "CLEAR_QUIZZES_STORE",
    payload: []
  }
}

export const deleteQuizFromCategory = (config, jwt) => {
  return (dispatch) => {
    return del("quiz/delete", config, jwt).then((response) => {
      dispatch(hideModal())
      dispatch({
        type: "DELETE_QUIZ_FROM_CATEGORY",
        payload: config.data
      })
      dispatch(setNotification("Quiz deleted", "success", true))
    }).catch((error) => {
      console.log(error.response)
      dispatch(hideModal())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - Unable to delete this quiz", "error", true))
      }
    })
  }
}
