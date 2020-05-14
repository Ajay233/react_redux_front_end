import { setNotification } from '../actions'
import { setNotificationReducer } from './index'

describe("the notification reducer", () => {

  it("can set the notification values when passed setNotification", () => {

    const initialState = {
      message: "",
      type: "",
      show: false,
      timed: true
    }

    const msg = "Test message"
    const type = "success"
    const show = true

    const action = setNotification(msg, type, show)

    const newState = setNotificationReducer(initialState, action)

    expect(newState.message).toEqual("Test message")
    expect(newState.type).toEqual("success")
    expect(newState.show).toEqual(true)
    expect(newState.timed).toEqual(true)

  })

  it("can return its initial state if no matching action is passed in", () => {

    const initialState = {
      message: "",
      type: "",
      show: false,
      timed: true
    }

    const testState = {
      message: "Test message",
      type: "error",
      show: true,
      timed: true
    }

    const action = {
      type: "UNRECOGNISED_TYPE",
      payload: testState
    }

    const newState = setNotificationReducer(initialState, action)

    expect(newState).toEqual(initialState)

  })

})
