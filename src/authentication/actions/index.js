import { post } from '../../axiosRequests/requests'
import { reset } from 'redux-form'
import { setNotification } from '../../notifications/actions'
import { getCategories } from '../../lists/actions'
import { setLoaderState } from '../../components/actions'
import history from '../../history'

export const setUser = (endpoint, loginDetails) => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    return post(endpoint, loginDetails).then((response) => {
      dispatch(setLoaderState())
      dispatch(setUserData(response.data.user, response.data.jwt))
      history.push("/")
      dispatch(getCategories("lookup/quizCategories", response.data.jwt))
      dispatch(setNotification(`Welcome back ${response.data.user.forename}`, "loginSuccess", true))
    }).catch((error) => {
      dispatch(setLoaderState())
      console.log(error.response)
      if(error.response.data){
        dispatch(reset('loginForm'))
        if(error.response.data === "NOT VERIFIED"){
          const verifyMsg = "Your email has not yet been veirified.  You will need to verify your email before you can log in"
          dispatch(setNotification(verifyMsg, "warning", true))
        } else {
          dispatch(setNotification(error.response.data, "error", true));
        }
      }
    })
  }
}

export const setVerficationProcess = (endpoint, verificationDetails) => {

  return (dispatch) => {

    return post(endpoint, verificationDetails).then((response) => {
      const successMsg = "Your email has now been verified.  Please log in below to continue."
      history.push("/login")
      dispatch(setNotification(successMsg, "verifySuccess", true, false));
      // dispatch({
      //   type: "SET_VERIFY_PROCESS_STATUS",
      //   payload: {
      //     completionStatus: "completed",
      //     token: "",
      //     error: {}
      //   }
      // })
    }).catch((error) => {
      dispatch({
        type: "SET_VERIFY_PROCESS_STATUS",
        payload: {
          completionStatus: "not verified",
          token: verificationDetails.token,
          error: error.response
        }
      })
    })
  }
}

export const setUserData = (user, jwt) => {
  return {
    type: "SET_USER",
    payload: {
      id: user.id,
      forename: user.forename,
      surname: user.surname,
      email: user.email,
      permission: user.permission,
      verified: user.verified,
      jwt: jwt,
      loggedIn: true
    }
  }
}

export const setRedirect = (status) => {
  return {
    type: "SET_REDIRECT",
    payload: {
      status: status
    }
  }
}

export const logOut = () => {
  return {
    type: "RESET_APP"
  }
}
