import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { setQuestionsReducer, setCurrentQuestionReducer } from './index'
import {
  getQuestions,
  setCurrentQuestion,
  deleteQuestion,
  addQuestion,
  updateQuestion,
  clearQuestions
} from '../actions'

jest.mock("../../axiosRequests/axiosUtil")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("setQuestionsReducer", () => {
  it("should add a list of questions to the questions store if passed an action from getQuestions", () => {
    const store = mockStore({})
    const initialState = []
    const expectedState = [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 3, questionNumber: 3 }]

    return store.dispatch(getQuestions("question/findByQuizId", "data", "jwt")).then(() => {
      const newState = setQuestionsReducer(initialState, store.getActions()[0])
      return newState
    })

    expect(newState).toEqual(expectedState)
  })

  it("should delete a question from the questions store if passed an action from deleteQuestion", () => {
    const initialState = [{ id: 1, questionNumber: 1 } , { id: 2, questionNumber: 2 } , { id: 3, questionNumber: 3 }]
    const expectedState = [{ id: 1, questionNumber: 1 } , { id: 3, questionNumber: 3 }]
    const question = initialState[1]
    const newState = setQuestionsReducer(initialState, deleteQuestion(question));
    expect(newState).toEqual(expectedState)
  })

  it("should add a question to the questions store if passed an action from addQuestion", () => {
    const initialState = [{ id: 1, questionNumber: 1 } , { id: 3, questionNumber: 3 } , { id: 5, questionNumber: 5 }]
    const expectedState = [
      { id: 1, questionNumber: 1 },
      { id: 3, questionNumber: 3 },
      { id: 4, questionNumber: 4 },
      { id: 5, questionNumber: 5 }
    ]
    const question = { id: 4, questionNumber: 4 }
    const newState = setQuestionsReducer(initialState, addQuestion(question))

    expect(newState).toEqual(expectedState)
  })

  it("should update a question in the questions store if passed an action from updateQuestion", () => {
    const initialState = [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 4, questionNumber: 4 }]
    const expectedState = [{ id: 2, questionNumber: 2 }, { id: 1, questionNumber: 3 }, { id: 4, questionNumber: 4 }]
    const question = { id: 1, questionNumber: 3 }

    const newState = setQuestionsReducer(initialState, updateQuestion(question))
    expect(newState).toEqual(expectedState)
  })

  it("should clear all questions from the questions store if passed an action from clearQuestions", () => {
    const initialState = [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 4, questionNumber: 4 }]
    const expectedState = [];

    const newState = setQuestionsReducer(initialState, clearQuestions())
    expect(newState).toEqual(expectedState)
  })

  it("should return the default state when no recognised actions are recieved", () => {
    const initialState = []

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setQuestionsReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})

describe("setCurrentQuestionReducer", () => {
  it("should set a question within the current question store", () => {
    const initialState = {}
    const expectedState = { id: 1, questionNumber: 1 }
    const question = { id: 1, questionNumber: 1 }

    const newState = setCurrentQuestionReducer(initialState, setCurrentQuestion(question))
    expect(newState).toEqual(expectedState)
  })

  it("should replace a question if one exists in the current question store", () => {
    const initialState = { id: 1, questionNumber: 1 }
    const expectedState = { id: 2, questionNumber: 2 }
    const question = { id: 2, questionNumber: 2 }

    const newState = setCurrentQuestionReducer(initialState, setCurrentQuestion(question))
    expect(newState).toEqual(expectedState)
  })

  it("should return the default state when no recognised actions are recieved", () => {
    const initialState = {}

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setCurrentQuestionReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
