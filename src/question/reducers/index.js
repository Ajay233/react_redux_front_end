import { questions } from '../factory/questionsFactory'
import { insertQuestion, updateQuestionAndSort } from '../../utils/sorting'


export const setQuestionsReducer = (state=questions, action) => {
  switch (action.type) {
    case "SET_QUESTIONS": return action.payload;
    case "DELETE_QUESTION": return state.filter(question => question!== action.payload);
    case "ADD_QUESTION": return insertQuestion(state, action.payload);
    case "UPDATE_QUESTION": return updateQuestionAndSort(state, action.payload)
    case "CLEAR_QUESTIONS": return action.payload;
    default: return state;
  }
}


export const setCurrentQuestionReducer = (state={}, action) => {
  switch (action.type) {
    case "SET_CURRENT_QUESTION": return action.payload
    default: return state;
  }
}
