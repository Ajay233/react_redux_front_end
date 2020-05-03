export const setQuizSearchReducer = (state=[], action) => {
  switch (action.type) {
    // case "SET_QUIZES": return action.payload;
    case "GET_ALL_QUIZES": return action.payload;
    case "SET_QUIZ_SEARCH_RESULTS": return action.payload;
    default: return state;
  }
}
