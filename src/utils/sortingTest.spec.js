import { insertQuestion, insertAnswer } from './sorting'

describe("insertQuestion", () => {

  let store;

  beforeEach(() => {
    store = [
      {questionNumber: 2},
      {questionNumber: 4},
      {questionNumber: 6},
      {questionNumber: 8}
    ]
  });

  it("can insert a question into the correct index of an array of questions, based on question number", () => {
    const question = {questionNumber: 5}

    let newState = insertQuestion(store, question)

    expect(newState.indexOf(question)).toEqual(2)
  })

  it("can add the question to the end of an array if the question number is larger than the rest", () => {
    const question = {questionNumber: 10}

    let newState = insertQuestion(store, question)

    expect(newState.indexOf(question)).toEqual(4)
  })

  it("can simply add the question to an array if the array is empty", () => {
    let emptyStore = []
    const question = {questionNumber: 5}

    let newState = insertQuestion(emptyStore, question)

    expect(newState.indexOf(question)).toEqual(0)
  })
})


describe("insertAnswer", () => {

  let store;

  beforeEach(() => {
    store = [
      {answerNumber: 2},
      {answerNumber: 4},
      {answerNumber: 6},
      {answerNumber: 8}
    ]
  });

  it("can insert a answer into the correct index of an array of answers, based on answer number", () => {
    const answer = {answerNumber: 5}

    let newState = insertAnswer(store, answer)

    expect(newState.indexOf(answer)).toEqual(2)
  })

  it("can add the answer to the end of an array if the answer number is larger than the rest", () => {
    const answer = {answerNumber: 10}

    let newState = insertAnswer(store, answer)

    expect(newState.indexOf(answer)).toEqual(4)
  })

  it("can simply add the answer to an array if the array is empty", () => {
    let emptyStore = []
    const answer = {answerNumber: 5}

    let newState = insertAnswer(emptyStore, answer)

    expect(newState.indexOf(answer)).toEqual(0)
  })
})
