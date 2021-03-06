import { post, put, del } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'
import { sessionExpired } from '../../utils/session'
import { clearQuestions } from '../../question/actions'
import { hideModal } from '../../modal/actions'
import { setLoaderState } from '../../components/actions'
import history from '../../history'

export const setQuiz = (quiz) => {
  return {
    type: "SET_QUIZ",
    payload: quiz
  }
}

export const createQuiz = (body, jwt) => {
  return (dispatch) => {
    dispatch(setLoaderState(true, "Saving...", "saving"))
    return post("quiz/create", body, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch(setQuiz(response.data));
      dispatch(clearQuestions());
      history.push("/editQuiz");
      dispatch(setNotification("Quiz created, but what's a quiz without questions? Add your questions below.", "success", true));
    }).catch((error) => {
      console.log(error.response);
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else if(error.response.status === 500 && error.response.data.message.includes("Maximum upload size exceeded")) {
        dispatch(setNotification("Error - Image exceeds the maximum size of 1040KB", "error", true));
      } else {
        dispatch(setNotification("Error - Unable to create quiz", "error", true));
      }
    })
  }
}

export const updateQuiz = (body, jwt) => {
  return (dispatch) => {
    dispatch(setLoaderState(true, "Saving...", "saving"))
    return put("quiz/update", body, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch(setQuiz(response.data));
      dispatch(setNotification("Quiz updated", "success", true));
    }).catch((error) => {
      console.log(error.response);
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else if(error.response.status === 500 && error.response.data.message.includes("Maximum upload size exceeded")) {
        dispatch(setNotification("Error - Image exceeds the maximum size of 1040KB", "error", true));
      } else {
        dispatch(setNotification("Error - Unable to update quiz", "error", true));
      }
    })
  }
}

export const deleteQuiz = (config, jwt) => {
  return (dispatch) => {
    dispatch(hideModal())
    dispatch(setLoaderState(true, "Deleting..."))
    return del("quiz/delete", config, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch({
        type: "DELETE_QUIZ",
        payload: { id: "", name: "", description: "", category: "", status: "" }
      })
      history.push("/")
      dispatch(setNotification("Quiz deleted", "success", true))
    }).catch((error) => {
      console.log(error.response)
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - Unable to delete this quiz", "error", true))
      }
    })
  }
}

export const updateQuizStatus = (endpoint, data, jwt) => {
  return (dispatch) => {
    dispatch(setLoaderState(true, "Saving...", "saving"))
    return put(endpoint, data, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch({
        type: "SET_STATUS",
        payload: response.data
      })
      dispatch(setNotification(`Quiz status updated to - ${response.data.status}`, "success", true))
    }).catch((error) => {
      console.log(error.response)
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else if(error.response.status === 400){
        dispatch(setNotification(error.response.data, "error", true))
      } else {
        dispatch(setNotification("Error - Unable to update quiz status", "error", true))
      }
    })
  }
}

export const deleteQuizImage = (config, jwt) => {
  return (dispatch) => {
    dispatch(hideModal())
    dispatch(setLoaderState(true, "Deleting..."))
    return del("quiz/deleteImage", config, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch(setQuiz(response.data))
      dispatch(setNotification("Image has been deleted", "success", true))
    }).catch((error) => {
      console.log(error.response);
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - Unable to delete this image", "error", true))
      }
    })
  }
}
