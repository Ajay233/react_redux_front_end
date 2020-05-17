import { setUserResults, clearUserResults } from '../actions'
import { setUserResultsReducer } from './index'

describe("setUserResultsReducer", () => {
  it("should set the userResults state when passed setUserResults", () => {
    const initialState = {}

    const expectedState = {
      id: 1,
      forename: "test"
    }

    const results = {
      id: 1,
      forename: "test"
    }

    const newState = setUserResultsReducer(initialState, setUserResults(results))

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
