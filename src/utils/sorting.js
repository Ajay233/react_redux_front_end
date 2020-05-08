export function sortAscending(array){
  
}

export function sortDescending(array){

}

export function insertQuestion(state, question){
  if(state.length === 0){
    return [...state, question];
  } else if(state.every(function(e){return e.questionNumber < question.questionNumber})){
    console.log("Question number was reater than all others")
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
