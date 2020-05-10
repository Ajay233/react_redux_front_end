import { quizProgressTracking } from '../factory/quizProgressTrackingFactory'

export const setQuizProgressTracking = (state=quizProgressTracking, action) => {
  switch (action.type) {
    case "ADD_SELECTED_ANSWER": return {...state, answersPicked: [...state.answersPicked, action.payload] };
    case "INCREMENT_QUESTION": return {...state, questionNumber: action.payload };
    case "SHOW_RESULTS": return {...state, showResults: action.payload};
    default: return state;
  }
}
