import { insertQuestion, insertAnswer, updateAnswerAndSort, updateQuestionAndSort } from './sorting'

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

describe("updateAnswerAndSort", () => {
  it("can replace the old answer in an array that has less than 2 elements", () => {
    const initialState = [
      { id: 1,
        answerNumber: 1,
        description: "testDescription"
      }
    ]

    const updatedAnswer = {
      id: 1,
      answerNumber: 3,
      description: "updatedDescription"
    }

    const newState = [
      {
        id: 1,
        answerNumber: 3,
        description: "updatedDescription"
      }
    ]

    expect(updateAnswerAndSort(initialState, updatedAnswer)).toEqual(newState)
  })

  it("can remove the old answer and insert the new answer in an array that has 2 or more elements", () => {
    const initialState = [
      { id: 1,
        answerNumber: 1,
        description: "testDescription"
      },
      { id: 3,
        answerNumber: 2,
        description: "testDescription"
      }
    ]

    const expectedState = [
      { id: 3,
        answerNumber: 2,
        description: "testDescription"
      },
      {
        id: 1,
        answerNumber: 3,
        description: "updatedDescription"
      }
    ]

    const updatedAnswer = {
      id: 1,
      answerNumber: 3,
      description: "updatedDescription"
    }

    expect(updateAnswerAndSort(initialState, updatedAnswer)).toEqual(expectedState)

  })
})

describe("updateQuestionAndSort", () => {
  it("can replace the old question in an array that has less than 2 elements", () => {
    const initialState = [
      { id: 1,
        questionNumber: 1,
        description: "testDescription"
      }
    ]

    const updatedQuestion = {
      id: 1,
      questionNumber: 3,
      description: "updatedDescription"
    }

    const newState = [
      {
        id: 1,
        questionNumber: 3,
        description: "updatedDescription"
      }
    ]

    expect(updateQuestionAndSort(initialState, updatedQuestion)).toEqual(newState)
  })

  it("can remove the old question and insert the new question in an array that has 2 or more elements", () => {
    const initialState = [
      { id: 1,
        questionNumber: 1,
        description: "testDescription"
      },
      { id: 3,
        questionNumber: 2,
        description: "testDescription"
      }
    ]

    const expectedState = [
      { id: 3,
        questionNumber: 2,
        description: "testDescription"
      },
      {
        id: 1,
        questionNumber: 3,
        description: "updatedDescription"
      }
    ]

    const updatedQuestion = {
      id: 1,
      questionNumber: 3,
      description: "updatedDescription"
    }

    expect(updateQuestionAndSort(initialState, updatedQuestion)).toEqual(expectedState)

  })
})
