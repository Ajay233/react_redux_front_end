import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { setQuizSearchReducer } from './index'
import {
  setQuizes,
  getAllQuizes,
  getQuizSearchResults,
  deleteQuiz,
  addQuiz,
  clearQuizes,
  deleteQuizFromCategory
} from '../actions'
import mockAxios from 'jest-mock-axios'


jest.mock("../../axiosRequests/axiosUtil")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("", () => {

  beforeEach(() => {
    mockAxios.reset()
  })

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

    const requestResponse = {
      data: expectedState
    }

    store.dispatch(getAllQuizes("quiz/getAll", "jwt"))
    mockAxios.mockResponse(requestResponse)
    const newState = setQuizSearchReducer(initialState, store.getActions()[0])
    expect(newState).toEqual(expectedState)
  })

  it("should use the payload from getQuizSearchResults to set the state", () => {
    const store = mockStore({})
    const initialState = []

    const expectedState = [
      {id: 1, name: "test1", status: "READY"},
      {id: 3, name: "test3", status: "READY"}
    ]

    const requestResponse = {
      data: [
        {id: 1, name: "test1", status: "READY"},
        {id: 2, name: "test2", status: "DRAFT"},
        {id: 3, name: "test3", status: "READY"}
      ]
    }

    store.dispatch(getQuizSearchResults("quiz/findByCategory", "data", "jwt", "USER"))
    mockAxios.mockResponse(requestResponse)
    const newState = setQuizSearchReducer(initialState, store.getActions()[0])
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


  it("should delete a quiz from a category's quizList", () => {
      const initialState = [
        {
          category: "test1",
          quizList: [
            {id: 1, name: "testQuiz1", description: "quiz1", category: "test1", status: "DRAFT"},
            {id: 2, name: "testQuiz2", description: "quiz2", category: "test1", status: "DRAFT"},
            {id: 3, name: "testQuiz3", description: "quiz3", category: "test1", status: "DRAFT"}
          ]
        },
        {
          category: "test2",
          quizList: [
            {id: 4, name: "testQuiz1", description: "quiz1", category: "test2", status: "DRAFT"},
            {id: 5, name: "testQuiz2", description: "quiz2", category: "test2", status: "DRAFT"},
            {id: 6, name: "testQuiz3", description: "quiz3", category: "test2", status: "DRAFT"}
          ]
        },
        {
          category: "test3",
          quizList: [
            {id: 7, name: "testQuiz1", description: "quiz1", category: "test3", status: "DRAFT"},
            {id: 8, name: "testQuiz2", description: "quiz2", category: "test3", status: "DRAFT"},
            {id: 9, name: "testQuiz3", description: "quiz3", category: "test3", status: "DRAFT"}
          ]
        }
      ]

      const expectedState = [
        {
          category: "test1",
          quizList: [
            {id: 1, name: "testQuiz1", description: "quiz1", category: "test1", status: "DRAFT"},
            {id: 2, name: "testQuiz2", description: "quiz2", category: "test1", status: "DRAFT"},
            {id: 3, name: "testQuiz3", description: "quiz3", category: "test1", status: "DRAFT"}
          ]
        },
        {
          category: "test2",
          quizList: [
            {id: 4, name: "testQuiz1", description: "quiz1", category: "test2", status: "DRAFT"},
            {id: 6, name: "testQuiz3", description: "quiz3", category: "test2", status: "DRAFT"}
          ]
        },
        {
          category: "test3",
          quizList: [
            {id: 7, name: "testQuiz1", description: "quiz1", category: "test3", status: "DRAFT"},
            {id: 8, name: "testQuiz2", description: "quiz2", category: "test3", status: "DRAFT"},
            {id: 9, name: "testQuiz3", description: "quiz3", category: "test3", status: "DRAFT"}
          ]
        }
      ]

      const quiz = initialState[1].quizList[1]
      const newState = setQuizSearchReducer(initialState, deleteQuizFromCategory(quiz))
      expect(newState).toEqual(expectedState)
  })

})
