import { setQuiz, updateQuizStatus, deleteQuiz } from '../actions'
import { setQuizReducer } from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'jest-mock-axios'

jest.mock("../../axiosRequests/axiosUtil")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("setQuizReducer", () => {

  it("should set the quiz store when passed an action from setQuiz", () => {
    const store = mockStore({})

    const initialState = {}
    const expectedState = {
      id: "1",
      name: "Test",
      description: "Test description",
      category: "Test category",
      status: "DRAFT"
    }
    const question = {
      id: "1",
      name: "Test",
      description: "Test description",
      category: "Test category",
      status: "DRAFT"
    }

    const newState = setQuizReducer(initialState, setQuiz(question))

    expect(newState).toEqual(expectedState)
  })

  it("should set the status of a quiz in the store when passed DELETE_QUIZ", () => {
    const store = mockStore({})
    const requestResponse = { status: 200 }
    const initialState = {
      id: "1",
      name: "Test",
      description: "Test description",
      category: "Test category",
      status: "DRAFT"
    }

    const expectedState = {
      id: "",
      name: "",
      description: "",
      category: "",
      status: ""
    }

    store.dispatch(deleteQuiz())
    mockAxios.mockResponse(requestResponse)
    const newState = setQuizReducer(initialState, store.getActions()[3])
    expect(newState).toEqual(expectedState)

  })

  it("should set the status of a quiz in the store when passed an action from updateQuizStatus", () => {
    const store = mockStore({})

    const initialState = {
      id: "1",
      name: "Test",
      description: "Test description",
      category: "Test category",
      status: "DRAFT"
    }

    const expectedState = {
      id: "1",
      name: "Test",
      description: "Test description",
      category: "Test category",
      status: "READY"
    }

    const requestResponse = {
      data: {
        id: "1",
        name: "Test",
        description: "Test description",
        category: "Test category",
        status: "READY"
      }
    }

    store.dispatch(updateQuizStatus("quiz/updateStatus", "quizData", "Jwt"))
    mockAxios.mockResponse(requestResponse)
    const newState = setQuizReducer(initialState, store.getActions()[2])


    expect(newState).toEqual(expectedState)
  })

  it("should return the default state when passed an unrecognised action", () => {
    const initialState = {}

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setQuizReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
