import { post } from '../../axiosRequests/requests'

export const setUser = (endpoint, loginDetails) => {

  return (dispatch) => {

    post(endpoint, loginDetails).then((response) => {
      dispatch({
        type: "SET_USER_LOGGED_IN",
        payload: {
          forename: response.data.user.forename,
          surname: response.data.user.surname,
          email: response.data.user.email,
          permission: response.data.user.permission,
          verified: response.data.user.verified,
          jwt: response.data.jwt,
          loggedIn: true
        }
      })
    }).catch((error) => {
      dispatch({
        type: "SET_USER_LOGGED_IN",
        payload: {
          error: error.response
        }
      })
    })
  }
}

export const logOutUser = () => {
  return {
    type: "LOG_OUT_USER",
    payload: {
      forename: "",
      surname: "",
      email: "",
      permission: "",
      verified: "",
      jwt: "",
      loggedIn: false
    }
  }
}

export const setVerficationProcess = (endpoint, verificationDetails) => {

  return (dispatch) => {

    post(endpoint, verificationDetails).then((response) => {
      dispatch({
        type: "SET_VERIFY_PROCESS_STATUS",
        payload: {
          completionStatus: "completed"
        }
      })
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

// export const getUser = (userId) => {
//   return {
//     type: "GET_USER",
//     payload: {
//       userId
//   }
// }
