export const quizDownloadReducer = (state={}, action) => {
  switch (action.type) {
    case "SET_QUIZ_DOWNLOAD_DATA": return action.payload
    default: return state
  }
}
