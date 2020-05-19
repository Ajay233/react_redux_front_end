import { setUser, logOut, setVerficationProcess, setRedirect } from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { post } from '../../axiosRequests/requests'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock("../../axiosRequests/axiosUtil")

describe("setUser", () => {

  it("should create an action to set a user's data and an action to set notification", () => {

    let store = mockStore({})

    const expectedAction1 = {
      type: "SET_USER_LOGGED_IN",
      payload: {
        id: 1,
        forename: "Joe",
        surname: "Bloggs",
        email: "JoeBloggs@test.com",
        permission: "USER",
        verified: "true",
        jwt: "jwtString",
        loggedIn: true

      }
    }

    const expectedAction2 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Welcome back Joe",
        type: "loginSuccess",
        show: true,
        timed: true
      }
    }

    return store.dispatch(setUser("auth/login", "data")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction1)
      expect(store.getActions()[1]).toEqual(expectedAction2)
    })

  })

  it("can return an action to set email not verified notification", () => {
    let store = mockStore({})
    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Your email has not yet been veirified.  You will need to verify your email before you can log in",
        type: "warning",
        show: true,
        timed: true
      }
    }

    return store.dispatch(setUser("auth/loginUnverified", "data")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

  })

  it("can return an action to set incorrect credentials notification", () => {
    let store = mockStore({})
    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "The username or password you entered was incorrect",
        type: "error",
        show: true,
        timed: true
      }
    }

    return store.dispatch(setUser("auth/loginFailed", "")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

  })
})

describe("setVerficationProcess", () => {
  it("can create an action to set the status of the verification process", () => {
    let store = mockStore({})

    const expectedAction = {
      type: "SET_VERIFY_PROCESS_STATUS",
      payload: {
        completionStatus: "completed",
        token: "",
        error: {}
      }
    }

    return store.dispatch(setVerficationProcess("auth/verify", {token: "testToken"})).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })

  it("can create an action to set an error status of the verification process", () => {
    let store = mockStore({})

    const expectedAction = {
      type: "SET_VERIFY_PROCESS_STATUS",
      payload: {
        completionStatus: "not verified",
        token: "testToken",
        error: {
          "data": ""
        }
      }
    }

    return store.dispatch(setVerficationProcess("auth/verifyFailed", {token: "testToken"})).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })
})

describe("redirect", () => {
  it("can create an action to set the redirect status", () => {
    const expectedAction = {
      type: "SET_REDIRECT",
      payload: {
        status: "redirect"
      }
    }

    expect(setRedirect("redirect")).toEqual(expectedAction)

  })
})

describe("logOut", () => {
  it("can create an action to reset the entire store", () => {
    const expectedAction = {
      type: "RESET_APP"
    }

    expect(logOut()).toEqual(expectedAction)

  })
})
