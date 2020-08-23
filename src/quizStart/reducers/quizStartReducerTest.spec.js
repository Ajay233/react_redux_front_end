import { addAnswer, incrementQuestion, showResults, exitQuiz } from '../actions'
import { setQuizProgressTracking } from './index'

describe("setQuizProgressTracking", () => {
  it("should add the selected answer to the snawersPisked state", () => {
    const initialState = {
      questionNumber: 0,
      answersPicked:[],
      showResults: false
    }

    const expectedState = {
      questionNumber: 0,
      answersPicked:[
        { id: 1, answerIndex: 1 }
      ],
      showResults: false
    }

    const answer = { id: 1, answerIndex: 1 }

    const newState = setQuizProgressTracking(initialState, addAnswer(answer))

    expect(newState).toEqual(expectedState)
  })

  it("should increment the questionNumber state", () => {
    const initialState = {
      questionNumber: 0,
      answersPicked:[],
      showResults: false
    }

    const expectedState = {
      questionNumber: 1,
      answersPicked:[],
      showResults: false
    }

    const newState = setQuizProgressTracking(initialState, incrementQuestion(1))

    expect(newState).toEqual(expectedState)
  })

  it("should set the showResults state to true", () => {
    const initialState = {
      questionNumber: 0,
      answersPicked:[],
      showResults: false
    }

    const expectedState = {
      questionNumber: 0,
      answersPicked:[],
      showResults: true
    }

    const newState = setQuizProgressTracking(initialState, showResults())

    expect(newState).toEqual(expectedState)
  })

  it("should return the default state if an unrecognised action is passed in", () => {
    const initialState = {
      questionNumber: 0,
      answersPicked:[],
      showResults: false
    }
    const action = { type: "UNRECOGNISED_ACTION"}
    const newState = setQuizProgressTracking(initialState, action)
    expect(newState).toEqual(initialState)
  })
})
