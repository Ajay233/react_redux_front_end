export const setUserResults = (results) => {
  return {
    type: "SET_USER_RESULTS",
    payload: {
      users: results
    }
  }
}
