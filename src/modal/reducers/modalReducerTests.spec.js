import { showModalReducer } from './index'
import {
  showModal,
  showModal2,
  showModal3,
  hideModal
} from '../actions'

describe("showModalReducer", () => {
  it("should return an updated modal state when passed the action from showModal", () => {
    const initilState = {
      showModal: false,
      showModal2: false,
      showModal3: false
    }

    const expectedState = {
      showModal: true,
      showModal2: false,
      showModal3: false
    }

    const newState = showModalReducer(initilState, showModal())

    expect(newState).toEqual(expectedState)
  })

  it("should return an updated modal state when passed the action from showModal2", () => {
    const initilState = {
      showModal: false,
      showModal2: false,
      showModal3: false
    }

    const expectedState = {
      showModal: false,
      showModal2: true,
      showModal3: false
    }

    const newState = showModalReducer(initilState, showModal2())

    expect(newState).toEqual(expectedState)
  })

  it("should return an updated modal state when passed the action from showModal3", () => {
    const initilState = {
      showModal: false,
      showModal2: false,
      showModal3: false
    }

    const expectedState = {
      showModal: false,
      showModal2: false,
      showModal3: true
    }

    const newState = showModalReducer(initilState, showModal3())

    expect(newState).toEqual(expectedState)
  })

  it("should return an updated modal state when passed the action from hideModal", () => {
    const initilState = {
      showModal: false,
      showModal2: true,
      showModal3: false
    }

    const expectedState = {
      showModal: false,
      showModal2: false,
      showModal3: false
    }

    const newState = showModalReducer(initilState, hideModal())

    expect(newState).toEqual(expectedState)
  })

  it("should return the default modal state when passed an unrecognised action", () => {
    const initilState = {
      showModal: false,
      showModal2: false,
      showModal3: false
    }

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = showModalReducer(initilState, action)

    expect(newState).toEqual(initilState)
  })
})
