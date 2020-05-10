export const addAnswer = (answer) => {
  return {
    type: "ADD_SELECTED_ANSWER",
    payload: answer
  }
}

export const incrementQuestion = (questionNumber) => {
  return {
    type: "INCREMENT_QUESTION",
    payload: questionNumber
  }
}

export const showResults = () => {
  return {
    type: "SHOW_RESULTS",
    payload: true
  }
}

export const exitQuiz = () => {
  return {
    type: "RESET_STATE"
  }
}
