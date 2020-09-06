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
  it("should create an action to delete an answer", () => {
    const answer = {answerIndex: 1, description: "answer"}

    const expectedAction = {
      type: "DELETE_ANSWER",
      payload: answer
    }

    expect(deleteAnswer(answer)).toEqual(expectedAction)
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

  it("should return an action to set notification on error", () => {
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

    const expectedAction = {
      type: "UPDATE_ANSWER",
      payload: answer
    }

    expect(updateAnswer(answer)).toEqual(expectedAction)
  })
})
