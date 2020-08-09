import { post } from '../../axiosRequests/requests'
import { setNotification } from '../../notifications/actions'
import { getCategories } from '../../lists/actions'
import history from '../../history'

export const setUser = (endpoint, loginDetails) => {

  return (dispatch) => {

    return post(endpoint, loginDetails).then((response) => {
      dispatch({
        type: "SET_USER_LOGGED_IN",
        payload: {
          id: response.data.user.id,
          forename: response.data.user.forename,
          surname: response.data.user.surname,
          email: response.data.user.email,
          permission: response.data.user.permission,
          verified: response.data.user.verified,
          jwt: response.data.jwt,
          loggedIn: true
        }
      })
      history.push("/")
      dispatch(getCategories("lookup/quizCategories", response.data.jwt))
      dispatch(setNotification(`Welcome back ${response.data.user.forename}`, "loginSuccess", true))
    }).catch((error) => {
      if(error.response.data === "NOT VERIFIED"){
        const verifyMsg = "Your email has not yet been veirified.  You will need to verify your email before you can log in"
        dispatch(setNotification(verifyMsg, "warning", true))
      } else {
        dispatch(setNotification("The username or password you entered was incorrect", "error", true));
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
