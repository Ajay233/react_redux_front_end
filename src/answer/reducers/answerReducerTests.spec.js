import { setAnswersReducer, setCurrentAnswerReducer } from './index'
import {
  getAnswers,
  setCurrentAnswer,
  deleteAnswer,
  addAnswer,
  updateAnswer
} from '../actions'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

jest.mock('../../axiosRequests/axiosUtil')

describe("setAnswersReducer", () => {
  it("can set the state of answers when passed the SET_ANSWERS action", () => {

    const store = mockStore({
      answers:[]
    })

    let requestResponse = {
      data: [
        { answerIndex: 1 },
        { answerIndex: 2 }
      ]
    }

    const expectedState = [
      { answerIndex: 1 },
      { answerIndex: 2 }
    ]

    store.dispatch(getAnswers())
    mockAxios.mockResponse(requestResponse)
    const newState = setAnswersReducer(store, store.getActions()[0])

    expect(newState).toEqual(expectedState)
  })

  it("can set the state of answers when passed the UPDATE_ANSWER action", () => {
    const store = mockStore({})
    const initialState = [
      { id: 1,
        answerIndex: 1,
        description: "testDescription"
      },
      { id: 3,
        answerIndex: 2,
        description: "testDescription"
      }
    ]

    const expectedState = [
      { id: 3,
        answerIndex: 2,
        description: "testDescription"
      },
      {
        id: 1,
        answerIndex: 3,
        description: "updatedDescription"
      }
    ]

    const requestResponse = {
      data: [{
        id: 1,
        answerIndex: 3,
        description: "updatedDescription"
      }]
    }

    store.dispatch(updateAnswer())
    mockAxios.mockResponse(requestResponse)
    const newState = setAnswersReducer(initialState, store.getActions()[0])

    expect(newState).toEqual(expectedState)
  })

  it("can set the state of answers when passed the DELETE_ANSWER action", () => {
    const initialState = [
      { id: 1, answerIndex: 1 },
      { id: 2, answerIndex: 2 },
      { id: 3, answerIndex: 3 }
    ]

    const expectedState = [
      { id: 1, answerIndex: 1 },
      { id: 3, answerIndex: 3 }
    ]

    const answer = initialState[1]

    const action = deleteAnswer(answer);

    const newState = setAnswersReducer(initialState, action);

    expect(newState).toEqual(expectedState)
  })

  it("can set the state of answers when passed the ADD_ANSWER action", () => {
    const store = mockStore({})

    const initialState = [
      { answerIndex: 1 },
      { answerIndex: 3 },
      { answerIndex: 5 },
    ]

    const expectedState = [
      { answerIndex: 1 },
      { answerIndex: 3 },
      { answerIndex: 4 },
      { answerIndex: 5 },
    ]

    const requestResponse = {
      data: [{ answerIndex: 4 }]
    }

    store.dispatch(addAnswer())
    mockAxios.mockResponse(requestResponse)
    const newState = setAnswersReducer(initialState, store.getActions()[0])

    expect(newState).toEqual(expectedState)
  })

  it("can return the current state if no actions match", () => {
    const initialState = [
      { answerIndex: 1 },
      { answerIndex: 3 },
      { answerIndex: 4 }
    ]

    const action = { type: "UNRECOGNISED_TYPE", payload: { answerIndex: 5 }}

    const newState = setAnswersReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})

describe("setCurrentAnswerReducer", () => {
  it("can set the state of answers when passed the setCurrentAnswer action", () => {
    const initialState = {}

    const expectedState = {
      id: 1,
      answerIndex: 1
    }

    const action = setCurrentAnswer({id:1, answerIndex:1})

    const newState = setCurrentAnswerReducer(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it("can return the current state if no actions match", () => {
    const initialState = {
      answerIndex: 1
    }

    const action = { type: "UNRECOGNISED_TYPE", payload: { answerIndex: 5 }}

    const newState = setCurrentAnswerReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
