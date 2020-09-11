import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { sessionExpired } from "../../utils/session"
import {
  getAnswers,
  setCurrentAnswer,
  deleteAnswer,
  addAnswer,
  updateAnswer
} from './index'
import mockAxios from 'jest-mock-axios'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

jest.mock("../../utils/session")
jest.mock("../../axiosRequests/axiosUtil")

beforeEach(() => {
  sessionExpired.mockClear()
})

describe("getAnswers", () => {
  it("should create an action to set a list of answers", () => {

    const store = mockStore({})

    const requestResponse = {
      data: [ { questionNumber: 1 }, { questionNumber: 2 } ]
    }

    const expectedAction = {
      type: "SET_ANSWERS",
      payload: [ { questionNumber: 1 }, { questionNumber: 2 } ]
    }

    store.dispatch(getAnswers())
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })

  it("should set an error notification if the catch block is reached", () => {
    const store = mockStore({})

    const requestResponse = {
      response: {
        status: 403
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error retrieving answers",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(getAnswers())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})

describe("setCurrentAnswer", () => {
  it("should create an action to set the current answer", () => {
    const answer = {answerIndex: 1, description: "answer"}

    const expectedAction = {
      type: "SET_CURRENT_ANSWER",
      payload: answer
    }

    expect(setCurrentAnswer(answer)).toEqual(expectedAction)
  })
})

describe("deleteAnswer", () => {
  it("should return an action to hideModal, delete an answer and set notification", () => {
    const store = mockStore({})
    const config = {
      data: [{answerIndex: 1, description: "answer"}]
    }
    const expectedAction = {
      type: "HIDE_MODAL",
      payload: {
        showModal: false,
        showModal2: false,
        showModal3: false,
        imgPath: null
      }
    }

    const expectedAction2 = {
      type: "DELETE_ANSWER",
      payload: {answerIndex: 1, description: "answer"}
    }

    const expectedAction3 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Answer deleted",
        type: "success",
        show: true,
        timed: true
      }
    }

    const requestResponse = {
      status: 200
    }

    store.dispatch(deleteAnswer(config, "jwt"))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })

  it("should call session expired on error status: 403", () => {
    let store = mockStore({})

    const requestResponse = {
      response: {
        status: 403
      }
    }

    store.dispatch(deleteAnswer())
    mockAxios.mockError(requestResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1);
  })

  it("should return an action to set notification on error", () => {
    let store = mockStore({})

    const requestResponse = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "HIDE_MODAL",
      payload: {
        showModal: false,
        showModal2: false,
        showModal3: false,
        imgPath: null
      }
    }

    const expectedAction2 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - Unable to delete this answer",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(deleteAnswer())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
  })
})

describe("addAnswer", () => {
  it("should return an action to add an answer and set notification on success", () => {
    const answer = {answerIndex: 1, description: "answer"}
    let store = mockStore({})

    const requestResponse = {
      data: [answer]
    }

    const expectedAction = {
      type: "ADD_ANSWER",
      payload: answer
    }

    const expectedAction2 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Answer created",
        type: "success",
        show: true,
        timed: true
      }
    }

    store.dispatch(addAnswer())
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
  })

  it("should call session expired on error status: 403", () => {
    const answer = {answerIndex: 1, description: "answer"}
    let store = mockStore({})

    const requestResponse = {
      response: {
        status: 403
      }
    }

    store.dispatch(addAnswer())
    mockAxios.mockError(requestResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1);
  })

  it("should return an action to set notification on error", () => {
    const answer = {answerIndex: 1, description: "answer"}
    let store = mockStore({})

    const requestResponse = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to create answer",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(addAnswer())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})

describe("updateAnswer", () => {
  it("should return an action to update an answer", () => {
    const answer = {answerIndex: 1, description: "answer"}
    let store = mockStore({})

    const requestResponse = {
      data: [answer]
    }

    const expectedAction = {
      type: "UPDATE_ANSWER",
      payload: answer
    }

    const expectedAction2 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Answer updated",
        type: "success",
        show: true,
        timed: true
      }
    }
    store.dispatch(updateAnswer())
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
  })

  it("should return an action to update an answer", () => {
    const answer = {answerIndex: 1, description: "answer"}
    let store = mockStore({})

    const requestResponse = {
      data: [answer]
    }

    const expectedAction = {
      type: "UPDATE_ANSWER",
      payload: answer
    }

    const expectedAction2 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Answer updated",
        type: "success",
        show: true,
        timed: true
      }
    }
    store.dispatch(updateAnswer())
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
  })

  it("should call session expired on error status 403", () => {
    let store = mockStore({})

    const requestResponse = {
      response: {
        status: 403
      }
    }

    store.dispatch(updateAnswer())
    mockAxios.mockError(requestResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should return an action to set notification on any other error", () => {
    const answer = {answerIndex: 1, description: "answer"}
    let store = mockStore({})

    const requestResponse = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to update answer",
        type: "error",
        show: true,
        timed: true
      }
    }
    store.dispatch(updateAnswer())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})
