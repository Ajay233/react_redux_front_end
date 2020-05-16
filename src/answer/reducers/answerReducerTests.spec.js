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

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

jest.mock('../../axiosRequests/axiosUtil')

describe("setAnswersReducer", () => {
  it("can set the state of answers when passed the getAnswers action", () => {

    const store = mockStore({
      answers:[]
    })

    const expectedState = [
      { answerNumber: 1 },
      { answerNumber: 2 }
    ]

    return store.dispatch(getAnswers("answer/findByQuestionId", "")).then(() =>{
      const newState = setAnswersReducer(store, store.getActions()[0])
      return newState
    })

    expect(newState).toEqual(expectedState)

  })

  it("can set the state of answers when passed the updateAnswer action", () => {
    const initialState = [
      { id: 1,
        answerNumber: 1,
        description: "testDescription"
      },
      { id: 3,
        answerNumber: 2,
        description: "testDescription"
      }
    ]

    const expectedState = [
      { id: 3,
        answerNumber: 2,
        description: "testDescription"
      },
      {
        id: 1,
        answerNumber: 3,
        description: "updatedDescription"
      }
    ]

    const action = updateAnswer({ id: 1, answerNumber: 3, description: "updatedDescription" })

    const newState = setAnswersReducer(initialState, action)

    expect(newState).toEqual(expectedState)

  })

  it("can set the state of answers when passed the deleteAnswer action", () => {
    const initialState = [
      { id: 1, answerNumber: 1 },
      { id: 2, answerNumber: 2 },
      { id: 3, answerNumber: 3 }
    ]

    const expectedState = [
      { id: 1, answerNumber: 1 },
      { id: 3, answerNumber: 3 }
    ]

    const answer = initialState[1]

    const action = deleteAnswer(answer);

    const newState = setAnswersReducer(initialState, action);

    expect(newState).toEqual(expectedState)
  })

  it("can set the state of answers when passed the addAnswer action", () => {
    const initialState = [
      { answerNumber: 1 },
      { answerNumber: 3 },
      { answerNumber: 5 },
    ]

    const expectedState = [
      { answerNumber: 1 },
      { answerNumber: 3 },
      { answerNumber: 4 },
      { answerNumber: 5 },
    ]

    const action = addAnswer({ answerNumber: 4 });

    const newState = setAnswersReducer(initialState, action);

    expect(newState).toEqual(expectedState)
  })

  it("can return the current state if no actions match", () => {
    const initialState = [
      { answerNumber: 1 },
      { answerNumber: 3 },
      { answerNumber: 4 }
    ]

    const action = { type: "UNRECOGNISED_TYPE", payload: { answerNumber: 5 }}

    const newState = setAnswersReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })

})

describe("setCurrentAnswerReducer", () => {
  it("can set the state of answers when passed the setCurrentAnswer action", () => {
    const initialState = {}

    const expectedState = {
      id: 1,
      answerNumber: 1
    }

    const action = setCurrentAnswer({id:1, answerNumber:1})

    const newState = setCurrentAnswerReducer(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it("can return the current state if no actions match", () => {
    const initialState = {
      answerNumber: 1
    }

    const action = { type: "UNRECOGNISED_TYPE", payload: { answerNumber: 5 }}

    const newState = setCurrentAnswerReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
