import { setQuiz, updateQuizStatus } from './index'
import configureMockStore from 'redux-mock-store'
import { sessionExpired } from '../../utils/session'
import thunk from 'redux-thunk'
import mockAxios from 'jest-mock-axios'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("setQuiz", () => {
  it("should return an action to set the quiz store", () => {
    const expectedAction = {
      type: "SET_QUIZ",
      payload: { id: 1, name: "test" }
    }

    const quiz = { id: 1, name: "test" }

    expect(setQuiz(quiz)).toEqual(expectedAction)
  })
})

describe("updateQuizStatus", () => {

  afterEach(() => {
    mockAxios.reset();
  })

  it("should return an action to set the quiz status store", () => {
    const store = mockStore({})

    const requestResponse = {
      data: {
        id: "1",
        name: "Test",
        description: "Test description",
        category: "Test category",
        status: "READY"
      }
    }

    const expectedAction = {
      type: "SET_STATUS",
      payload: {
        id: "1",
        name: "Test",
        description: "Test description",
        category: "Test category",
        status: "READY"
      }
    }

    store.dispatch(updateQuizStatus("quiz/updateStatus", "quizData", "Jwt"))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })

  it("should call the sessionExpired function", () => {
    const store = mockStore({})

    const requestError = {
      response: {
        status: 403
      }
    }

    store.dispatch(updateQuizStatus("sessionExpired", "quizData", "expiredJwt"))
    mockAxios.mockError(requestError)
    expect(sessionExpired).toHaveBeenCalledTimes(1);
  })

  it("should return an action to set the notification store with an error message", () => {
    const store = mockStore({})

    const requestError = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - Unable to update quiz status",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(updateQuizStatus())
    mockAxios.mockError(requestError)
    expect(store.getActions()[0]).toEqual(expectedAction)

  })
})
