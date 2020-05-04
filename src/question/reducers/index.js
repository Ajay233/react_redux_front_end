import { questions } from '../factory/questionsFactory'

export const setQuestionsReducer = (state=questions, action) => {
  switch (action.type) {
    case "SET_QUESTIONS": return action.payload;
    case "DELETE_QUESTION": return state.filter(question => question!== action.payload)
    default: return state;
  }
}


export const setCurrentQuestionReducer = (state={}, action) => {
  switch (action.type) {
    case "SET_CURRENT_QUESTION": return action.payload
    default: return state;
  }
}
