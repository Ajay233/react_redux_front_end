import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { setQuizSearchReducer } from './index'
import {
  setQuizes,
  getAllQuizes,
  getQuizSearchResults,
  deleteQuiz,
  addQuiz,
  clearQuizes
} from '../actions'

jest.mock("../../axiosRequests/axiosUtil")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("", () => {
  it("should use the payload from setQuizes to set the state", () => {
    const initialState = []
    const expectedState = [
      {id: 1, name: "test1"},
      {id: 2, name: "test2"}
    ]
    const quizes = [
      {id: 1, name: "test1"},
      {id: 2, name: "test2"}
    ]

    const newState = setQuizSearchReducer(initialState, setQuizes(quizes))
    expect(newState).toEqual(expectedState)

  })

  it("should use the payload from getAllQuizes to set the state", () => {
    const store = mockStore({})
    const initialState = []
    const expectedState = [
      {
        category: "cat1",
        quizes: [
          {id: 1, name: "test1"},
          {id: 2, name: "test2"}
        ]
      },
      {
        category: "cat2",
        quizes: [
          {id: 3, name: "test3"},
          {id: 4, name: "test4"}
        ]
      }
    ]

    return store.dispatch(getAllQuizes("quiz/getAll", "jwt")).then(() => {
      const newState = setQuizSearchReducer(initialState, store.getActions()[0])
      return newState
    })

    expect(newState).toEqual(expectedState)
  })

  it("should use the payload from getQuizSearchResults to set the state", () => {
    const store = mockStore({})
    const initialState = []

    const expectedState = [
      {id: 1, name: "test1", status: "READY"},
      {id: 3, name: "test3", status: "READY"}
    ]

    return store.dispatch(getQuizSearchResults("quiz/findByCategory", "data", "jwt", "USER")).then(() => {
      const newState = setQuizSearchReducer(initialState, store.getActions()[0])
      return newState
    })

    expect(newState).toEqual(expectedState)

  })

  it("should use the payload from deleteQuiz to remove a quiz from the state", () => {
    const initialState = [
      {id: 1, name: "test1", status: "DRAFT"},
      {id: 2, name: "test2", status: "DRAFT"},
      {id: 3, name: "test3", status: "DRAFT"}
    ]

    const expectedState = [
      {id: 1, name: "test1", status: "DRAFT"},
      {id: 3, name: "test3", status: "DRAFT"}
    ]

    const quiz = initialState[1]

    const newState = setQuizSearchReducer(initialState, deleteQuiz(quiz))
    expect(newState).toEqual(expectedState)
  })

  it("should use the payload from addQuiz to set the state", () => {
    const initialState = [
      {id: 1, name: "test1", status: "DRAFT"},
      {id: 2, name: "test2", status: "DRAFT"}
    ]

    const expectedState = [
      {id: 1, name: "test1", status: "DRAFT"},
      {id: 2, name: "test2", status: "DRAFT"},
      {id: 3, name: "test3", status: "DRAFT"}
    ]

    const quiz = {id: 3, name: "test3", status: "DRAFT"}

    const newState = setQuizSearchReducer(initialState, addQuiz(quiz))

    expect(newState).toEqual(expectedState)
  })

  it("should clear the quizes state", () => {
    const initialState = [
      {id: 1, name: "test1", status: "DRAFT"},
      {id: 2, name: "test2", status: "DRAFT"},
      {id: 3, name: "test3", status: "DRAFT"}
    ]

    const expectedState = []

    const newState = setQuizSearchReducer(initialState, clearQuizes())
    expect(newState).toEqual(expectedState)
  })

  it("should return the initial state if no recognised action is passed in", () => {
    const initialState = []

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setQuizSearchReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })
})
