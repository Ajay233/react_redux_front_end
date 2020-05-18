import { setUserList, clearUserList } from './index'
import { sessionExpired } from '../../utils/session'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("setUserList", () => {
  it("should return an action to set the userList state", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_USER_LIST",
      payload: [
        { id: 1, forename: "test" },
        { id: 2, forename: "test2" }
      ]
    }

    return store.dispatch(setUserList("users", "jwt")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

  })

  it("should call the sessionExpired function", () => {
    const store = mockStore({})

    return store.dispatch(setUserList("sessionExpired")).then(() => {
      expect(sessionExpired).toHaveBeenCalledTimes(1)
    })
  })

  it("should return an action to set the notification state", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to get user list",
        type: "error",
        show: true,
        timed: true
      }
    }

    return store.dispatch(setUserList("error")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
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
