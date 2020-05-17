import {setUser, logOut, setVerficationProcess, setRedirect} from '../actions'
import { setUserReducer, setVerificationProcessStatus, setRedirectReducer } from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore =  configureMockStore(middlewares)

jest.mock("../../axiosRequests/axiosUtil")

describe("setUserReducer", () => {
  it("sets the user state when passed the setUser action", () => {

    const store = mockStore({})

    const expectedState = {
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

    return store.dispatch(setUser("auth/login", "credentials")).then(() => {
      const newState = setUserReducer(store, store.getActions()[0])
      return newState
    })

    expect(newState).toEqual(expectedState)

  })

  it("returns the default state when no action types match", () => {
    const initialState = {
      id: "",
      forename: "",
      surname: "",
      email: "",
      permission: "",
      verified: "",
      jwt: "",
      loggedIn: false
    }

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setUserReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})

describe("setVerificationProcessStatus", () => {
  it("sets the virification status state when passed the setVerficationProcess action", () => {
    const store = mockStore({})

    const expectedState = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Your email has not yet been veirified.  You will need to verify your email before you can log in",
        type: "warning",
        show: true,
        timed: true
      }
    }

    return store.dispatch(setVerficationProcess("auth/verify", {token: "testToken"})).then(() => {
      const newState = setVerificationProcessStatus(store, store.getActions()[0])
      return newState
    })
    expect(newState).toEqual(expectedState)
  })

  it("returns the default state when no action types match", () => {
    const initialState = {
      completionStatus: "",
      token: ""
    }

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setVerificationProcessStatus(initialState, action)

    expect(newState).toEqual(initialState)
  })
})

describe("setRedirectReducer", () => {
  it("sets the redirect status when passed the setRedirect action", () => {
    const initialState = {
      status: false
    }

    const expectedState = {
      status: true
    }

    const newState = setRedirectReducer(initialState, setRedirect(true))

    expect(newState).toEqual(expectedState)

  })

  it("returns the default state when no action types match", () => {
    const initialState = {
      status: false
    }

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setRedirectReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
