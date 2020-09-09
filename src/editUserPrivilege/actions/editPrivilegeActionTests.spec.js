import { setUserResults, clearUserResults } from './index'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { sessionExpired } from "../../utils/session"

jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("setUserResults", () => {
  it("should return an action to set the user results state", () => {
    const store = mockStore({})
    const expectedAction = {
      type: "SET_USER_RESULTS",
      payload: {
        id: 1,
        forename: "test"
      }
    }

    const requestResponse = {
      data: {
        id: 1,
        forename: "test"
      }
    }

    store.dispatch(setUserResults())
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })

  it("should call sessionExpired on error status 403", () => {
    const store = mockStore({})

    const requestResponse = {
      response: {
        status: 403
      }
    }

    store.dispatch(setUserResults())
    mockAxios.mockError(requestResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should return an action to set the error notification for any other error", () => {
    const store = mockStore({})
    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Test message",
        type: "error",
        show: true,
        timed: true
      }
    }

    const requestResponse = {
      response: {
        status: 404,
        data: "Test message"
      }
    }

    store.dispatch(setUserResults())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})

describe("clearUserResults", () => {
  it("should return an action to clear the user results state", () => {
    const expectedAction = {
      type: "CLEAR_USER_RESULTS",
      payload: {}
    }

    expect(clearUserResults()).toEqual(expectedAction)
  })
})
