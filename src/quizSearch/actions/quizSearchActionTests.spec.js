import configuerMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { sessionExpired } from '../../utils/session'
import {
  setQuizes,
  getAllQuizes,
  getQuizSearchResults,
  deleteQuiz,
  addQuiz,
  clearQuizes
} from './index'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configuerMockStore(middlewares)

describe("setQuizes", () => {
  it("should return an action to set quizes in the quizes store", () => {
    const expectedAction = {
      type: "SET_QUIZES",
      payload: [{id: 1, name: "test1"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]
    }

    const questions = [{id: 1, name: "test1"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]

    expect(setQuizes(questions)).toEqual(expectedAction)
  })
})

describe("getAllQuizes", () => {
  it("should return an action to set all quizes in the quizes store", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "GET_ALL_QUIZES",
      payload: [
        {
          category: "cat1",
          quizes: [
            {id: 1, name: "test1"},
            {id: 2, name: "test2"}
          ]
        },
        {
          category: "cat2",
          quizes: [
            {id: 3, name: "test3"},
            {id: 4, name: "test4"}
          ]
        }
      ]
    }

    return store.dispatch(getAllQuizes("quiz/getAll", "jwt")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })

  it("should call sessionExpired if a 403 error status is recieved", () => {
    const store = mockStore({})

    return store.dispatch(getAllQuizes("sessionExpired", "jwt")).then(() => {
      expect(sessionExpired).toHaveBeenCalledTimes(1)
    })
  })

  it("should return an action to set an error notification", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to get quiz list",
        type: "error",
        show: true,
        timed: true
      }
    }

    return store.dispatch(getAllQuizes()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })
})

describe("getQuizSearchResults", () => {
  it("should return an action to set quiz search results in the quizes store", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_QUIZ_SEARCH_RESULTS",
      payload: [
        {id: 1, name: "test1", status: "DRAFT"},
        {id: 2, name: "test2", status: "DRAFT"},
        {id: 3, name: "test3", status: "DRAFT"}
      ]
    }

    return store.dispatch(getQuizSearchResults("quiz/findByName","data", "jwt", "ADMIN")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })

  it("should filter out draft reports if requestor has USER permission to set appropriate payload", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_QUIZ_SEARCH_RESULTS",
      payload: [
        {id: 1, name: "test1", status: "READY"},
        {id: 3, name: "test3", status: "READY"}
      ]
    }

    return store.dispatch(getQuizSearchResults("quiz/findByCategory", "data", "jwt", "USER")).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })

  })

  it("should return an action to set an error notification if the response array is empty", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_QUIZ_SEARCH_RESULTS",
      payload: []
    }

    const expectedAction2 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "No results were found",
        type: "error",
        show: true,
        timed: true
      }
    }

    const msg = "No results were found"

    return store.dispatch(getQuizSearchResults("quiz/findByName", "data", "jwt", "USER", msg)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
      expect(store.getActions()[1]).toEqual(expectedAction2)
    })
  })

  it("should call sessionExpired if a 403 error status is recieved", () => {
    sessionExpired.mockClear() // clear the stored call count for this mock

    const store = mockStore({})

    return store.dispatch(getQuizSearchResults("sessionExpired", "jwt")).then(() => {
      expect(sessionExpired).toHaveBeenCalledTimes(1)
    })
  })

  it("should return an action to set an error notification", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to get quiz list",
        type: "error",
        show: true,
        timed: true
      }
    }
    const msg = "Error - unable to get quiz list"
    return store.dispatch(getQuizSearchResults("error", "data", "jwt", "ADMIN", msg)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  })

})

describe("deleteQuiz", () => {
  it("should return an action to delete a quiz from the quizes store", () => {
    const expectedAction = {
      type: "DELETE_QUIZ",
      payload: { id: 1, name: "test" }
    }

    const quiz = { id: 1, name: "test" }

    expect(deleteQuiz(quiz)).toEqual(expectedAction)

  })
})

describe("addQuiz", () => {
  it("should return an action to insert a quiz in the quizes store", () => {
    const expectedAction = {
      type: "ADD_QUIZ",
      payload: { id: 1, name: "test" }
    }

    const quiz = { id: 1, name: "test" }

    expect(addQuiz(quiz)).toEqual(expectedAction)
  })
})

describe("clearQuizes", () => {
  it("should return an action to clear the quizes store", () => {
    const expectedAction = {
      type: "CLEAR_QUIZZES_STORE",
      payload: []
    }

    expect(clearQuizes()).toEqual(expectedAction)
  })
})
