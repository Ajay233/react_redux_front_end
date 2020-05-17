import {
  showModal,
  showModal2,
  showModal3,
  hideModal
} from './index'

describe("showModal", () => {
  it("should return an action to update showModal", () => {
    const expectedAction = {
      type: "SHOW_MODAL",
      payload: {
        showModal: true,
        showModal2: false,
        showModal3: false
      }
    }

    expect(showModal()).toEqual(expectedAction)
  })
})

describe("showModal2", () => {
  it("should return an action to update showModal2", () => {
    const expectedAction = {
      type: "SHOW_MODAL",
      payload: {
        showModal: false,
        showModal2: true,
        showModal3: false
      }
    }

    expect(showModal2()).toEqual(expectedAction)
  })
})

describe("showModal3", () => {
  it("should return an action to update showModal3", () => {
    const expectedAction = {
      type: "SHOW_MODAL",
      payload: {
        showModal: false,
        showModal2: false,
        showModal3: true
      }
    }

    expect(showModal3()).toEqual(expectedAction)
  })
})

describe("hideModal", () => {
  it("should return an action to set all showModal valuse to false", () => {
    const expectedAction = {
      type: "HIDE_MODAL",
      payload: {
        showModal: false,
        showModal2: false,
        showModal3: false
      }
    }

    expect(hideModal()).toEqual(expectedAction)
  })
})
