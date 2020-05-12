export const setUserResults = (results) => {
  return {
    type: "SET_USER_RESULTS",
    payload: results
  }
}

export const clearUserResults = () => {
  return {
    type: "CLEAR_USER_RESULTS",
    payload: []
  }
}
