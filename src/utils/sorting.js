export function sortAscending(array){
  let ascendingResults = [];
  for(let i = 0; i < array.length; i++){

  }
}

export function sortDescending(array){

}

// When adding an answer or question inset it into the list at a specified index
// will need to do a function to iterate through comparing values until I get the right index, then use th eindex to insert


// If the array is empty, just add the payload
// else
// compare current question number to each element
// if the element > current question number
// splice(indexOf(element), 0, current question)
// if every element < current question
// just add it to the end as normal

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
