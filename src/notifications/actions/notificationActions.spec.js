import { setNotification } from './index'

describe("the setNotification action", () => {
  it("should create an action to set the notification", () => {
    const msg = "Test message"
    const type = "success"
    const show = true

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: msg,
        type: type,
        show: show,
        timed: true
      }
    }

    expect(setNotification(msg, type, show)).toEqual(expectedAction)

  })
})
