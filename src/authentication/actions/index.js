export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: {
      forename: user.forename,
      surname: user.surname,
      email: user.email,
      permission: user.permission,
      verified: user.verified
    }
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
      verified: ""
    }
  }
}

export const setJwt = (jwt) => {
  return {
    type: "SET_JWT",
    payload: {
      jwt: jwt
    }
  }
}

export const setLoginStatus = () => {
  return {
    type: "SET_LOGGED_IN",
    payload: {
      loggedIn: true
    }
  }
}

// export const getUser = (userId) => {
//   return {
//     type: "GET_USER",
//     payload: {
//       userId
//   }
// }
