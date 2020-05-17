import { setUserResults, clearUserResults } from './index'

describe("setUserResults", () => {
  it("should return an action to set the user results state", () => {
    const expectedAction = {
      type: "SET_USER_RESULTS",
      payload: {
        id: 1,
        forename: "test"
      }
    }

    const result = {
      id: 1,
      forename: "test"
    }

    expect(setUserResults(result)).toEqual(expectedAction)
  })
})

describe("clearUserResults", () => {
  it("should return an action to clear the user results state", () => {
    const expectedAction = {
      type: "CLEAR_USER_RESULTS",
      payload: []
    }

    expect(clearUserResults()).toEqual(expectedAction)
  })
})
