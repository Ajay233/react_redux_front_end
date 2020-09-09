import { setUserResults, clearUserResults } from '../actions'
import { setUserResultsReducer } from './index'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("setUserResultsReducer", () => {
  it("should set the userResults state when passed setUserResults", () => {
    const store = mockStore({})

    const initialState = {}
    const expectedState = {
      id: 1,
      forename: "test"
    }

    const requestResponse = {
      data: {
        id: 1,
        forename: "test"
      }
    }

    store.dispatch(setUserResults())
    mockAxios.mockResponse(requestResponse)
    const newState = setUserResultsReducer(initialState, store.getActions()[0])
    expect(newState).toEqual(expectedState)
  })

  it("should set the userResults state when passed clearUserResults", () => {
    const initialState = {
      id: 1,
      forename: "test"
    }

    const expectedState = {}

    const newState = setUserResultsReducer(initialState, clearUserResults())

    expect(newState).toEqual(expectedState)
  })

  it("should return the current state if no actions match", () => {
    const initialState = {}

    const action = {
      type: "UNRECOGNISED_ACTION"
    }

    const newState = setUserResultsReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
