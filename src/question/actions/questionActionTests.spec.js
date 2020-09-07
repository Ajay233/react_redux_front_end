import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { sessionExpired } from "../../utils/session"
import {
  getQuestions,
  setCurrentQuestion,
  deleteQuestion,
  addQuestion,
  updateQuestion,
  clearQuestions
} from './index'
import mockAxios from 'jest-mock-axios'


jest.mock("../../utils/session")
jest.mock("../../axiosRequests/axiosUtil")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

beforeEach(() => {
  sessionExpired.mockClear()
})

describe("getQuestions", () => {
  it("should return an action that will add a list of questions the questions store", () => {
    const store = mockStore({})

    const requestResponse = {
      data: [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 3, questionNumber: 3 }]
    }

    const expectedAction = {
      type: "SET_QUESTIONS",
      payload: [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 3, questionNumber: 3 }]
    }

    store.dispatch(getQuestions("question/findByQuizId", "data", "jwt"))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)

  })

  it("should call get answers and set current questions if startQuiz is set to true", () => {
    const store = mockStore({})

    const requestResponse = {
      data: [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 3, questionNumber: 3 }]
    }

    const requestResponse2 = {
      data: [{ questionNumber: 1 },{ questionNumber: 2 }]
    }

    const expectedAction = {
      type: "SET_QUESTIONS",
      payload: [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 3, questionNumber: 3 }]
    }

    const expectedAction2 = {
      type: "SET_CURRENT_QUESTION",
      payload: { id: 1, questionNumber: 1 }
    }

    const expectedAction3 = {
      type: "SET_ANSWERS",
      payload: [{ questionNumber: 1 },{ questionNumber: 2 }]
    }

    store.dispatch(getQuestions("question/findByQuizId", "data", "jwt", true))
    mockAxios.mockResponse(requestResponse)
    mockAxios.mockResponse(requestResponse2)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })

  it("should call sessionExpired if an error occurrs and the status id 403", () => {
    const store = mockStore({})

    const requestError = {
      response: {
        status: 403
      }
    }

    store.dispatch(getQuestions("sessionExpired", "data", "Jwt"))
    mockAxios.mockError(requestError)
    expect(sessionExpired).toHaveBeenCalledTimes(1);
  })
})

describe("deleteQuestion", () => {
  it("should return an action that will delete a question from the questions store", () => {
    const expectedAction = {
      type: "DELETE_QUESTION",
      payload: { id: 1 }
    }

    const question = { id: 1 }

    expect(deleteQuestion(question)).toEqual(expectedAction)
  })
})

describe("addQuestion", () => {
  it("should return an action that will add a question to the questions store", () => {
    const store = mockStore({})

    const requestResponse = {
      data: [{ id: 1 }]
    }

    const expectedAction = {
      type: "ADD_QUESTION",
      payload: { id: 1 }
    }

    store.dispatch(addQuestion())
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })

  it("should call sessionExpired if the error response status is 403", () => {
    const store = mockStore({})

    const requestResponse = {
      response: {
        status: 403
      }
    }

    store.dispatch(addQuestion())
    mockAxios.mockError(requestResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should call setNotification if the error response status is anything else", () => {
    const store = mockStore({})

    const requestResponse = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to create question with the details provided",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(addQuestion())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})

describe("updateQuestion", () => {
  it("should return an action that will update a question in the questions store", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_CURRENT_QUESTION",
      payload: { id: 1, questionNumber: 1 }
    }

    const expectedAction2 = {
      type: "UPDATE_QUESTION",
      payload: { id: 1, questionNumber: 1 }
    }

    const expectedAction3 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Question updated",
        type: "success",
        show: true,
        timed: true
      }
    }
    const requestResponse = {
      data: [{ id: 1, questionNumber: 1 }]
    }

    const question = { id: 1, questionNumber: 1 }
    store.dispatch(updateQuestion())
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })

  it("should call sessionExpired if the error response status is 403", () => {
    const store = mockStore({})

    const requestResponse = {
      response: {
        status: 403
      }
    }

    store.dispatch(updateQuestion())
    mockAxios.mockError(requestResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should call setNotification if the error response status is anything else", () => {
    const store = mockStore({})

    const requestResponse = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to update question",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(updateQuestion())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})

describe("clearQuestions", () => {
  it("should return an action that will clear the questions store", () => {
    const expectedAction = {
      type: "CLEAR_QUESTIONS",
      payload: []
    }

    expect(clearQuestions()).toEqual(expectedAction)
  })
})

describe("setCurrentQuestion", () => {
  it("should return an action that will add a question the question store", () => {
    const expectedAction = {
      type: "SET_CURRENT_QUESTION",
      payload: { id: 1 }
    }

    const question = { id: 1 }

    expect(setCurrentQuestion(question)).toEqual(expectedAction)
  })
})
