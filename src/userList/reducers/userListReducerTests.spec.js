import { setUserList, clearUserList } from '../actions'
import { setUserListReducer } from './index'
import { sessionExpired } from '../../utils/session'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'jest-mock-axios'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("setUserListReducer", () => {
  it("should set the userList store", () => {
    const store = mockStore({})

    const initialState = []
    const expectedState = [
      { id: 1, forename: "test" },
      { id: 2, forename: "test2" }
    ]

    const requestResponse = {
      data: [
        { id: 1, forename: "test" },
        { id: 2, forename: "test2" }
      ]
    }

    store.dispatch(setUserList("users", "jwt"))
    mockAxios.mockResponse(requestResponse)
    const newState = setUserListReducer(initialState, store.getActions()[0])
    expect(newState).toEqual(expectedState)
  })

  it("should clear the userList store", () => {
    const store = mockStore({})

    const initialState = [
      { id: 1, forename: "test" },
      { id: 2, forename: "test2" }
    ]
    const expectedState = []
    const newState = setUserListReducer(initialState, clearUserList())
  })

  it("should return the initial state if the action is not recognised", () => {
    const initialState = [
      { id: 1, forename: "test" },
      { id: 2, forename: "test2" }
    ]

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setUserListReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })
})
