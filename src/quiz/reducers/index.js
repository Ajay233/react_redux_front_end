import { quiz } from '../factory/quizFactory'

export const setQuizReducer = (state=quiz, action) => {
  switch (action.type) {
    case "SET_QUIZ": return action.payload;
    default: return state;
  }
}
