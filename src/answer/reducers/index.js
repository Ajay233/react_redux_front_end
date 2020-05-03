import { answers } from '../factory/answersFactory'

export const setAnswersReducer = (state=answers, action) => {
  switch (action.type) {
    case "SET_ANSWERS": return action.payload;
    case "DELETE_ANSWER": return state.filter(answer => answer != action.payload)
    default: return state
  }
}


export const setCurrentAnswerReducer = (state={}, action) => {
  switch (action.type) {
    case "SET_CURRENT_ANSWER": return action.payload;
    default: return state;
  }
}
