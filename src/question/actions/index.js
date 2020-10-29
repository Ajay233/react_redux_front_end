import { reset } from 'redux-form'
import { getUsingParams, post, put, del } from '../../axiosRequests/requests'
import { getAnswers } from '../../answer/actions'
import { sessionExpired } from '../../utils/session'
import { setNotification } from '../../notifications/actions'
import { hideModal } from '../../modal/actions'
import { setLoaderState } from '../../components/actions'
import history from '../../history'

export const addQuestion = (body, jwt) => {
  return (dispatch) => {
    dispatch(setLoaderState(true, "Saving...", "saving"))
    return post("question/create", body, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch({
        type: "ADD_QUESTION",
        payload: response.data
      })
      history.push("/editQuiz");
      dispatch(setNotification("Question created", "success", true));
    }).catch((error) => {
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else if(error.response.status === 500 && error.response.data.message.includes("Maximum upload size exceeded")) {
        dispatch(setNotification("Error - Image exceeds the maximum size of 1040KB", "error", true));
      } else {
        console.log(error.response);
        dispatch(setNotification("Error - unable to create question with the details provided", "error", true))
      }
    });
  }
}

export const getQuestions = (endpoint, param, jwt, startQuiz=false) => {
  return (dispatch) => {
    return getUsingParams(endpoint, param, jwt).then((response) => {
      if(response.data !== "NO QUESTIONS"){
        dispatch({
          type: "SET_QUESTIONS",
          payload: response.data
        })
      } else {
        dispatch({
          type: "SET_QUESTIONS",
          payload: []
        })
      }
      if(startQuiz){
        const body = { questionId: response.data[0].id }
        dispatch(getAnswers(body, jwt))
        dispatch(setCurrentQuestion(response.data[0]));
      }
      console.log("success")
    }).catch((error) => {
      console.log(error);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification(error.response.data, "error", true))
      }
    });
  }
}

export const updateQuestion = (body, jwt) => {
  return (dispatch) => {
    dispatch(setLoaderState(true, "Saving...", "saving"))
    return put("question/update", body, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch(setCurrentQuestion(response.data));
      dispatch({
        type: "UPDATE_QUESTION",
        payload: response.data
      })
      dispatch(setNotification("Question updated", "success", true))
      dispatch(reset('updateQuestionForm'))
    }).catch((error) => {
      console.log(error.response);
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else if(error.response.status === 500 && error.response.data.message.includes("Maximum upload size exceeded")) {
        dispatch(setNotification("Error - Image exceeds the maximum size of 1040KB", "error", true));
      } else {
        dispatch(setNotification("Error - unable to update question", "error", true))
      }
    });
  }
}

export const setCurrentQuestion = (question) => {
  return {
    type: "SET_CURRENT_QUESTION",
    payload: question
  }
}

export const deleteQuestion = (config, jwt) => {
  return (dispatch) => {
    dispatch(hideModal())
    dispatch(setLoaderState(true, "Deleting..."))
    return del("question/delete", config, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch({
        type: "DELETE_QUESTION",
        payload: config.data[0]
      })
      history.push("/editQuiz")
      dispatch(setNotification("Question deleted", "success", true));
    }).catch((error) => {
      console.log(error.response);
      dispatch(setLoaderState())
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        dispatch(setNotification("Error - Unable to delete this question", "error", true))
      }
    });
  }
}

export const deleteImage = (config, jwt) => {
  return (dispatch) => {
    dispatch(hideModal())
    dispatch(setLoaderState(true, "Deleting..."))
    return del("question/deleteImage", config, jwt).then((response) => {
      dispatch(setLoaderState())
      dispatch(setCurrentQuestion(response.data))
      dispatch({
        type: "UPDATE_QUESTION",
        payload: response.data
      })
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

export const clearQuestions = () => {
  return {
    type: "CLEAR_QUESTIONS",
    payload: []
  }
}
