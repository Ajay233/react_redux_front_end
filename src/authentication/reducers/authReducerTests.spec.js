import {setUser, logOut, setVerficationProcess, setRedirect} from '../actions'
import { setUserReducer, setVerificationProcessStatus, setRedirectReducer } from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'jest-mock-axios'

const middlewares = [thunk]
const mockStore =  configureMockStore(middlewares)

jest.mock("../../axiosRequests/axiosUtil")

describe("setUserReducer", () => {

  afterEach(() => {
    mockAxios.reset();
  });

  it("sets the user state when passed the setUser action", () => {

    const store = mockStore({})

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

    const expectedState = {
      id: 1,
      forename: "Joe",
      surname: "Bloggs",
      email: "JoeBloggs@test.com",
      permission: "USER",
      verified: "true",
      jwt: "jwtString",
      loggedIn: true
    }

    store.dispatch(setUser("auth/login", "credentials"))
    mockAxios.mockResponse(requestResponse)
    const newState = setUserReducer(store, store.getActions()[0])

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

  afterEach(() => {
    mockAxios.reset();
  });

  it("sets the virification status state when passed the setVerficationProcess action", () => {
    const store = mockStore({})

    const expectedState = {
      completionStatus: "completed",
      token: "",
      error: {}
    }

    store.dispatch(setVerficationProcess("auth/verify", {token: "testToken"}))
    mockAxios.mockResponse();
    const newState = setVerificationProcessStatus(store, store.getActions()[0])

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
