import { answers } from '../factory/answersFactory'
import { insertAnswer } from '../../utils/sorting'

export const setAnswersReducer = (state=answers, action) => {
  switch (action.type) {
    case "SET_ANSWERS": return action.payload;
    case "DELETE_ANSWER": return state.filter(answer => answer !== action.payload);
    case "ADD_ANSWER": return insertAnswer(state, action.payload);
    case "UPDATE_ANSWER": return state.map(answer => answer.id === action.payload.id ? action.payload : answer);
    default: return state
  }
}


export const setCurrentAnswerReducer = (state={}, action) => {
  switch (action.type) {
    case "SET_CURRENT_ANSWER": return action.payload;
    default: return state;
  }
}
