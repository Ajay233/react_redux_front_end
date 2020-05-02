export const setQuizesReducer = (state=[], action) => {
  if(action.type === "SET_QUIZES"){
    return action.payload;
  } else if(action.type === "SET_ALL_QUIZES") {
    return action.payload;
  } else {
    return state;
  }
}
