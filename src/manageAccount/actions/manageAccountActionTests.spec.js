import { updateUser } from './index'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { sessionExpired } from "../../utils/session"

jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

beforeEach(() => {
  sessionExpired.mockClear();
})

describe("updateUser", () => {
  it("should return an action to set user data", () => {
    const store = mockStore({})
    const expectedAction = {
      type: "SET_USER",
      payload: {
        id: 1,
        forename: "Joe",
        surname: "Blogs",
        email: "test@test.com",
        permission: "USER",
        verified: false,
        jwt: "testJwt",
        loggedIn: true
      }
    }

    const successMsg = "Profile information updated - Your email was changed so your access has been restriced until your email is verified"
    const expectedAction2 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: successMsg,
        type: "success",
        show: true,
        timed: true
      }
    }

    const response = {
      data: {
        user: {
          id: 1,
          forename: "Joe",
          surname: "Blogs",
          email: "test@test.com",
          permission: "USER",
          verified: false,
        },
        jwt: "testJwt"
      }
    }
    store.dispatch(updateUser())
    mockAxios.mockResponse(response)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
  })

  it("should return an action to set notification for minor updates", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_USER",
      payload: {
        id: 1,
        forename: "Joe",
        surname: "Blogs",
        email: "test@test.com",
        permission: "USER",
        verified: true,
        jwt: "testJwt",
        loggedIn: true
      }
    }

    const expectedAction2 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Profile information updated",
        type: "success",
        show: true,
        timed: true
      }
    }

    const response = {
      data: {
        id: 1,
        forename: "Joe",
        surname: "Blogs",
        email: "test@test.com",
        permission: "USER",
        verified: true,
      }
    }

    store.dispatch(updateUser({}, "testJwt"))
    mockAxios.mockResponse(response)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
  })

  it("should call session expired if a 403 status is recieved", () => {
    const store = mockStore({})
    const errorResponse = {
      response: {
        status: 403
      }
    }
    store.dispatch(updateUser())
    mockAxios.mockError(errorResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should return an action to set notification for any other error", () => {
    const store = mockStore({})
    const errorMsg = "Error updating your profile data, please check the details you provided and try again";
    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: errorMsg,
        type: "error",
        show: true,
        timed: true
      }
    }

    const errorResponse = {
      response: {
        status: 404
      }
    }
    store.dispatch(updateUser())
    mockAxios.mockError(errorResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})
