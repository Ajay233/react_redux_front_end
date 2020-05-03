import { questions } from '../factory/questionsFactory'

export const setQuestionsReducer = (state=questions, action) => {
  switch (action.type) {
    case "SET_QUESTIONS": return action.payload
    default: return state;
  }
}
