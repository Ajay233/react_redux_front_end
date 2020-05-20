import { setUserList, clearUserList } from './index'
import { sessionExpired } from '../../utils/session'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'jest-mock-axios'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("setUserList", () => {

  afterEach(() => {
    mockAxios.reset();
  })

  it("should return an action to set the userList state", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_USER_LIST",
      payload: [
        { id: 1, forename: "test" },
        { id: 2, forename: "test2" }
      ]
    }

    const requestResponse = {
      data: [
        { id: 1, forename: "test" },
        { id: 2, forename: "test2" }
      ]
    }

    store.dispatch(setUserList("users", "jwt"))
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

    store.dispatch(setUserList("sessionExpired"))
    mockAxios.mockError(requestError)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should return an action to set the notification state", () => {
    const store = mockStore({})

    const requestError = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to get user list",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(setUserList("error"))
    mockAxios.mockError(requestError)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})

describe("clearUserList", () => {
  it("should return an action to clear the userList state", () => {
    const expectedAction = {
      type: "CLEAR_USER_LIST",
      payload: []
    }

    expect(clearUserList()).toEqual(expectedAction)
  })
})
