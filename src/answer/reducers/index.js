import { answers } from '../factory/answersFactory'

export const setAnswersReducer = (state=answers, action) => {
  switch (action.type) {
    case "SET_ANSWERS": return action.payload;
    default: return state
  }
}
