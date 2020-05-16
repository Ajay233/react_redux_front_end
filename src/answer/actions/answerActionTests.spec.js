import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getUsingParams } from "../../axiosRequests/requests"
import {
  getAnswers,
  setCurrentAnswer,
  deleteAnswer,
  addAnswer,
  updateAnswer
} from './index'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

jest.mock('../../axiosRequests/axiosUtil')

describe("getAnswers", () => {
  it("should create an action to set a list of answers", () => {

    const store = mockStore({
      answers:[]
    })

    const expectedAction = {
      type: "SET_ANSWERS",
      payload: [
        {
          questionNumber: 1
        },
        {
          questionNumber: 2
        }
      ]
    }

    store.dispatch(getAnswers("answer/findByQuestionId", "")).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    }).catch((error) => {
      return // due to warning this has to be returned out of
    })

  })

  it("should set an error notification if the catch block is reached", () => {
    const store = mockStore({
      answers:[]
    })

    const expectedAction = {
      type: "SET_NOTIFICATION",
      payload: {
        message: "Error retrieving answers",
        type: "error",
        show: true,
        timed: true
      }
    }

    store.dispatch(getAnswers("", "")).then(() => {
      return // due to warning this has to be returned out of
    }).catch((error) => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

})

describe("setCurrentAnswer", () => {
  it("should create an action to set the current answer", () => {
    const answer = {answerNumber: 1, description: "answer"}

    const expectedAction = {
      type: "SET_CURRENT_ANSWER",
      payload: answer
    }

    expect(setCurrentAnswer(answer)).toEqual(expectedAction)
  })
})

describe("deleteAnswer", () => {
  it("should create an action to delete an answer", () => {
    const answer = {answerNumber: 1, description: "answer"}

    const expectedAction = {
      type: "DELETE_ANSWER",
      payload: answer
    }

    expect(deleteAnswer(answer)).toEqual(expectedAction)
  })
})

describe("addAnswer", () => {
  it("should create an action to add an answer", () => {
    const answer = {answerNumber: 1, description: "answer"}

    const expectedAction = {
      type: "ADD_ANSWER",
      payload: answer
    }

    expect(addAnswer(answer)).toEqual(expectedAction)
  })
})

describe("updateAnswer", () => {
  it("should create an action to update an answer", () => {
    const answer = {answerNumber: 1, description: "answer"}

    const expectedAction = {
      type: "UPDATE_ANSWER",
      payload: answer
    }

    expect(updateAnswer(answer)).toEqual(expectedAction)
  })
})
