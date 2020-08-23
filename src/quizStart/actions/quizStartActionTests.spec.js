import { addAnswer, incrementQuestion, showResults, exitQuiz } from './index'

describe("addAnswer", () => {
  it("should return an action to add an answer to progressTracking", () => {
    const expectedAction = {
      type: "ADD_SELECTED_ANSWER",
      payload: { id: 1, answerIndex: 1 }
    }

    const answer = { id: 1, answerIndex: 1 }

    expect(addAnswer(answer)).toEqual(expectedAction)
  })
})

describe("incrementQuestion", () => {
  it("should return an action to increment question number in state", () => {
    const expectedAction = {
      type: "INCREMENT_QUESTION",
      payload: 2
    }

    expect(incrementQuestion(2)).toEqual(expectedAction)

  })
})

describe("showResults", () => {
  it("should return an action to set show results state", () => {
    const expectedAction = {
      type: "SHOW_RESULTS",
      payload: true
    }

    expect(showResults()).toEqual(expectedAction)
  })
})

describe("exitQuiz", () => {
  it("should return an action to reset progress tracking state", () => {
    const expectedAction = {
      type: "RESET_STATE"
    }

    expect(exitQuiz()).toEqual(expectedAction)
  })
})
