import configureMockStore from 'reduc-mock-store'
import thunk from 'redux-thunk'
import {
  getQuestions,
  setCurrentQuestion,
  deleteQuestion,
  addQuestion,
  updateQuestion,
  clearQuestions
} from './index'

jest.mock("../../utils/session")
jest.mock("../../axiosRequests/axiosUtil")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("getQuestions", () => {
  it("should return an action that will add a list of questions the questions store", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_QUESTIONS",
      payload: [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 3, questionNumber: 3 }]
    }

    return store.dispatch(getQuestions("question/findByQuizId", "data", "jwt")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })

  it("should call sessionExpired if an error occurrs and the status id 403", () => {
    const store = mockStore({})

    return store.dispatch(getQuestions("sessionExpired", "data", "Jwt")).then(() => {
      expect(sessionExpired).toHaveBeenCalledTimes(1);
    })
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
    const expectedAction = {
      type: "ADD_QUESTION",
      payload: { id: 1 }
    }

    const question = { id: 1 }

    expect(addQuestion(question)).toEqual(expectedAction)
  })
})

describe("updateQuestion", () => {
  it("should return an action that will update a question in the questions store", () => {
    const expectedAction = {
      ype: "UPDATE_QUESTION",
      payload: { id: 1 }
    }

    expect(updateQuestion(question)).toEqual(expectedAction)
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
