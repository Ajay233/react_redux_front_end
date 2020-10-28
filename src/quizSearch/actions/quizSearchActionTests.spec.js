import configuerMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { sessionExpired } from '../../utils/session'
import {
  setQuizes,
  getAllQuizes,
  getQuizSearchResults,
  deleteQuiz,
  addQuiz,
  clearQuizes,
  deleteQuizFromCategory
} from './index'
import mockAxios from 'jest-mock-axios'


jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configuerMockStore(middlewares)

beforeEach(() => {
  sessionExpired.mockClear()
})

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

  beforeEach(() => {
    mockAxios.reset();
  })

  it("should return an action to set all quizes in the quizes store", () => {
    const store = mockStore({})

    const requestResponse = {
      data: [
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

    store.dispatch(getAllQuizes("quiz/getAll", "jwt"))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })

  it("should call sessionExpired if a 403 error status is recieved", () => {
    const store = mockStore({})

    const requestError = {
      response: {
        status: 403
      }
    }

    store.dispatch(getAllQuizes("sessionExpired", "jwt"))
    mockAxios.mockError(requestError)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should return an action to set an error notification", () => {
    const store = mockStore({})

    const requestError = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to get quiz list",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(getAllQuizes())
    mockAxios.mockError(requestError)
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})

describe("getQuizSearchResults", () => {

  beforeEach(() => {
    mockAxios.reset();
  })

  it("should return an action to set quiz search results in the quizes store", () => {
    const store = mockStore({})

    const requestResponse = {
      data: [
        {id: 1, name: "test1", status: "DRAFT"},
        {id: 2, name: "test2", status: "DRAFT"},
        {id: 3, name: "test3", status: "DRAFT"}
      ]
    }

    const expectedAction = {
      type: "SET_LOADER_STATE",
      payload: {
        show: true,
        message: "Searching",
        label: "searching"
      }
    }

    const expectedAction2 = {
      type: "SET_LOADER_STATE",
      payload: {
        show: false,
        message: "",
        label: ""
      }
    }

    const expectedAction3 = {
      type: "SET_QUIZ_SEARCH_RESULTS",
      payload: [
        {id: 1, name: "test1", status: "DRAFT"},
        {id: 2, name: "test2", status: "DRAFT"},
        {id: 3, name: "test3", status: "DRAFT"}
      ]
    }

    store.dispatch(getQuizSearchResults("quiz/findByName","data", "jwt", "ADMIN"))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })

  it("should filter out draft reports if requestor has USER permission to set appropriate payload", () => {
    const store = mockStore({})

    const requestResponse = {
      data: [
        {id: 1, name: "test1", status: "READY"},
        {id: 2, name: "test2", status: "DRAFT"},
        {id: 3, name: "test3", status: "READY"}
      ]
    }

    const expectedAction = {
      type: "SET_LOADER_STATE",
      payload: {
        show: true,
        message: "Searching",
        label: "searching"
      }
    }

    const expectedAction2 = {
      type: "SET_LOADER_STATE",
      payload: {
        show: false,
        message: "",
        label: ""
      }
    }

    const expectedAction3 = {
      type: "SET_QUIZ_SEARCH_RESULTS",
      payload: [
        {id: 1, name: "test1", status: "READY"},
        {id: 3, name: "test3", status: "READY"}
      ]
    }

    store.dispatch(getQuizSearchResults("quiz/findByCategory", "data", "jwt", "USER"))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })

  it("should return an action to set an error notification if the response array is empty", () => {
    const store = mockStore({})

    const requestResponse = {
      data: [
        {id: 1, name: "test1", status: "DRAFT"},
        {id: 2, name: "test2", status: "DRAFT"},
        {id: 3, name: "test3", status: "DRAFT"}
      ]
    }

    const expectedAction = {
      type: "SET_LOADER_STATE",
      payload: {
        show: true,
        message: "Searching",
        label: "searching"
      }
    }

    const expectedAction2 = {
      type: "SET_LOADER_STATE",
      payload: {
        show: false,
        message: "",
        label: ""
      }
    }

    const expectedAction3 = {
      type: "SET_QUIZ_SEARCH_RESULTS",
      payload: []
    }

    const expectedAction4 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "No results were found",
        type: "error",
        show: true,
        timed: true
      }
    }

    const msg = "No results were found"

    store.dispatch(getQuizSearchResults("quiz/findByName", "data", "jwt", "USER", msg))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
    expect(store.getActions()[3]).toEqual(expectedAction4)
  })

  it("should call sessionExpired if a 403 error status is recieved", () => {
    sessionExpired.mockClear() // clear the stored call count for this mock

    const store = mockStore({})

    const requestError = {
      response: {
        status: 403
      }
    }

    store.dispatch(getQuizSearchResults("sessionExpired", "jwt"))
    mockAxios.mockError(requestError)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should return an action to set an error notification", () => {
    const store = mockStore({})

    const requestError = {
      response: {
        status: 404
      }
    }

    const expectedAction = {
      type: "SET_LOADER_STATE",
      payload: {
        show: true,
        message: "Searching",
        label: "searching"
      }
    }

    const expectedAction2 = {
      type: "SET_LOADER_STATE",
      payload: {
        show: false,
        message: "",
        label: ""
      }
    }

    const expectedAction3 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error - unable to get quiz list",
        type: "error",
        show: true,
        timed: true
      }
    }
    const msg = "Error - unable to get quiz list"
    store.dispatch(getQuizSearchResults("error", "data", "jwt", "ADMIN", msg))
    mockAxios.mockError(requestError)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })
})

describe("deleteQuiz", () => {
  it("should return an action to hide modal, delete a quiz and set notification", () => {
    const store = mockStore({})
    const config = { data: { id: 1, name: "test" } }

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
      type: "DELETE_QUIZ",
      payload: { id: 1, name: "test" }
    }

    const expectedAction3 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Quiz deleted",
        type: "success",
        show: true,
        timed: true
      }
    }

    const requestResponse = { status: 200 }

    store.dispatch(deleteQuiz(config, "jwt"))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })

  it("should call sessionExpired on error status 403", () => {
    const store = mockStore({})
    const requestResponse = { response: { status: 403 } }

    store.dispatch(deleteQuiz())
    mockAxios.mockError(requestResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should return an action to hide modal and set notification for any other error", () => {
    const store = mockStore({})
    const requestResponse = { response: { status: 404 } }
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
        message: "Error - Unable to delete this quiz",
        type: "error",
        show: true,
        timed: true
      }
    }
    store.dispatch(deleteQuiz())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
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

describe("deleteQuizFromCategory", () => {
  it("should return an action to quiz from a category's quizList in quizes store", () => {
    const store = mockStore({})

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
      type: "DELETE_QUIZ_FROM_CATEGORY",
      payload: { id: 1, name: "test" }
    }

    const expectedAction3 = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Quiz deleted",
        type: "success",
        show: true,
        timed: true
      }
    }

    const config = { data: { id: 1, name: "test" } }
    const requestResponse = { status: 200 }
    store.dispatch(deleteQuizFromCategory(config, "jwt"))
    mockAxios.mockResponse(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
    expect(store.getActions()[2]).toEqual(expectedAction3)
  })

  it("should call sessionExpired on error status 403", () => {
    const store = mockStore({})
    const requestResponse = { response: { status: 403 } }

    store.dispatch(deleteQuizFromCategory())
    mockAxios.mockError(requestResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should return an action to hide modal and set notification for any other error", () => {
    const store = mockStore({})
    const requestResponse = { response: { status: 404 } }
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
        message: "Error - Unable to delete this quiz",
        type: "error",
        show: true,
        timed: true
      }
    }
    store.dispatch(deleteQuizFromCategory())
    mockAxios.mockError(requestResponse)
    expect(store.getActions()[0]).toEqual(expectedAction)
    expect(store.getActions()[1]).toEqual(expectedAction2)
  })
})
