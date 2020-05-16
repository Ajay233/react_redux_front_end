export function sortAnswersAscending(answers, highestIndex){

}

export function sortDescending(array){

}

export function updateAnswerAndSort(state, updatedAnswer){
  if(state.length < 2){
    return state.map(answer => answer.id === updatedAnswer.id ? updatedAnswer : answer);
  } else {
    let newState = state.filter(answer => answer.id !== updatedAnswer.id);
    return insertAnswer(newState, updatedAnswer);
  }
}


export function insertQuestion(state, question){
  if(state.length === 0){
    return [...state, question];
  } else if(state.every(function(e){return e.questionNumber < question.questionNumber})){
    return [...state, question];
  } else {
    let added = false
    let newState = state.slice()
    newState.forEach(element => {
      if(element.questionNumber > question.questionNumber && added === false){
        added = true
        newState.splice(newState.indexOf(element), 0, question)
        return;
      }
    })
    return newState
  }
}

export function insertAnswer(state, answer){
  if(state.length === 0){
    return [...state, answer];
  } else if(state.every(function(e){return e.answerNumber < answer.answerNumber})){
    return [...state, answer];
  } else {
    let added = false
    let newState = state.slice()
    newState.forEach(element => {
      if(element.answerNumber > answer.answerNumber && added === false){
        added = true
        newState.splice(newState.indexOf(element), 0, answer)
        return;
      }
    })
    return newState
  }
}
