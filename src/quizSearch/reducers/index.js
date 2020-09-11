import { deleteQuizFromCategory } from '../../utils/deleteActions'

// This may need to be split into a separate reducer for All Quizzes
export const setQuizSearchReducer = (state=[], action) => {
  switch (action.type) {
    case "SET_QUIZES": return action.payload;
    case "GET_ALL_QUIZES": return action.payload;
    case "SET_QUIZ_SEARCH_RESULTS": return action.payload;
    case "DELETE_QUIZ": return state.filter(quiz => quiz !== action.payload);
    case "ADD_QUIZ": return state.length !== 0 && state[0].category === action.payload.category ? [...state, action.payload] : state;
    case "CLEAR_QUIZZES_STORE": return action.payload;
    case "DELETE_QUIZ_FROM_CATEGORY": return deleteQuizFromCategory(state, action.payload);
    default: return state;
  }
}
