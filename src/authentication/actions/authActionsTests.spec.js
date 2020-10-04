import { setUser, logOut, setVerficationProcess, setRedirect } from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { post } from '../../axiosRequests/requests'
import mockAxios from 'jest-mock-axios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock("../../axiosRequests/axiosUtil")

describe("setUser", () => {

  afterEach(() => {
    mockAxios.reset();
  });

  it("should create an action to set a user's data and an action to set notification", () => {

    let store = mockStore({})

    let requestResponse = {
      data: {
        user: {
          id: 1,
          forename: "Joe",
          surname: "Bloggs",
          email: "JoeBloggs@test.com",
          permission: "USER",
          verified: "true"
        },
        jwt: "jwtString"
      }
    }

    let requestResponse2 = {
      data: [ "item1", "item2", "item3" ]
    }


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

    const expectedAction3 = {
      type: "SET_CATEGORIES",
      payload: [ "item1", "item2", "item3" ]
    }

    store.dispatch(setUser("auth/login", "data"))
    mockAxios.mockResponse(requestResponse)  // mock response for the login request
    mockAxios.mockResponse(requestResponse2) // mock response for the getCategories request
    expect(store.getActions()[0]).toEqual(expectedAction1)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })

  it("can return an action to set email not verified notification", () => {
    let store = mockStore({})

    let requestError = {
      response:{
        data: "NOT VERIFIED"
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Your email has not yet been veirified.  You will need to verify your email before you can log in",
        type: "warning",
        show: true,
        timed: true
      }
    }

    store.dispatch(setUser("auth/loginUnverified", "data"))
    mockAxios.mockError(requestError)
    expect(store.getActions()[1]).toEqual(expectedAction)
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

    let requestError = {
      response:{
        status: 400,
        data: "The username or password you entered was incorrect"
      }
    }

    store.dispatch(setUser("auth/loginFailed", ""))
    mockAxios.mockError(requestError)
    expect(store.getActions()[1]).toEqual(expectedAction)
  })
})

describe("setVerficationProcess", () => {

  afterEach(() => {
    mockAxios.reset();
  });

  it("can create an action to set the status of the verification process", () => {
    let store = mockStore({})

    const successMsg = "Your email has now been verified.  Please log in below to continue."

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: successMsg,
        type: "verifySuccess",
        show: true,
        timed: false
      }
    }

    store.dispatch(setVerficationProcess("auth/verify", {token: "testToken"}))
    mockAxios.mockResponse();
    expect(store.getActions()[0]).toEqual(expectedAction)
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

    let requestError = {
      response:{
        data: ""
      }
    }

    store.dispatch(setVerficationProcess("auth/verifyFailed", {token: "testToken"}))
    mockAxios.mockError(requestError);
    expect(store.getActions()[0]).toEqual(expectedAction)
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
