import React from 'react'
import { allReducers, rootReducer } from '../reducers'

const testAction1 = {
  type: "SET_CURRENT_ANSWER",
  payload: {
    id: 1, answerNumber: 1, description: "test", correctAnswer: true
  }
}

const testAction2 = {
  type: "SET_USER_LOGGED_IN",
  payload: {
    id: 1,
    forename: "test",
    surname: "test",
    email: "test",
    permission: "ADMIN",
    verified: true,
    jwt: "jwt",
    loggedIn: true
  }
}

const testAction3 = {
  type: "SET_ANSWERS",
  payload: ["test1", "test2", "test3", "test4"]
}

const testAction4 = {
  type: "SET_NOTIFICATION",
  payload: {
    message: "test",
    type: "success",
    show: true,
    timed: true
  }
}

const testAction5 = {
  type: "SET_QUESTIONS",
  payload: ["test1", "test2", "test3", "test4"]
}

describe("reducers", () => {

  it("should initialise the combined state of all reducers", () => {
    const expectedState = {
      userData: {id: "", forename: "", surname: "", email: "", permission: "", verified: "",jwt: "", loggedIn: false},
      verificationProcess: { completionStatus: "", token: "", error: {} },
      redirect: { status: false },
      notificationData: { message: "", type: "", show: false, timed: true },
      userResults: {},
      listOfUsers: [],
      quizProgressTracking: { questionNumber: 0, answersPicked:[], showResults: false },
      quizes: [],
      quiz: { id: "", name: "", description: "", category: "", status: "" },
      questions: [],
      currentQuestion: {},
      answers: [],
      currentAnswer: {},
      modalState: { showModal: false, showModal2: false, showModal3: false },
      lists: { categories: [] },
      form: {}
    }
    expect(allReducers({}, {type: "INIT"})).toEqual(expectedState)
  })

  it("should reflect when a reducer has updated a particular area of state", () => {
    const expectedState = {
      userData: {id: 1, forename: "test", surname: "test", email: "test", permission: "ADMIN", verified: true, jwt: "jwt", loggedIn: true},
      verificationProcess: { completionStatus: "", token: "", error: {} },
      redirect: { status: false },
      notificationData: { message: "test", type: "success", show: true, timed: true},
      userResults: {},
      listOfUsers: [],
      quizProgressTracking: { questionNumber: 0, answersPicked:[], showResults: false },
      quizes: [],
      quiz: { id: "", name: "", description: "", category: "", status: "" },
      questions: ["test1", "test2", "test3", "test4"],
      currentQuestion: { },
      answers: ["test1", "test2", "test3", "test4"],
      currentAnswer: { id: 1, answerNumber: 1, description: "test", correctAnswer: true },
      modalState: { showModal: false, showModal2: false, showModal3: false },
      lists: { categories: [] },
      form: {}
    }

    let state = allReducers({}, {type: "INIT"})
    state = allReducers(state, testAction1)
    state = allReducers(state, testAction2)
    state = allReducers(state, testAction3)
    state = allReducers(state, testAction4)
    state = allReducers(state, testAction5)

    expect(state).toEqual(expectedState)
  })
})

describe("rootReducer", () => {
  it("should reset the app state to undefined so it will be reinitialised", () => {

    let state = allReducers({}, {type: "INIT"})
    state = allReducers(state, testAction1)
    state = allReducers(state, testAction2)
    state = allReducers(state, testAction3)
    state = allReducers(state, testAction4)
    state = allReducers(state, testAction5)

    state = rootReducer(state, { type: "RESET_APP" })

    expect(state).toEqual(undefined)

  })

  it("should reset the app state except for userData and notificationData", () => {

    const expectedState = {
      userData: {id: 1, forename: "test", surname: "test", email: "test", permission: "ADMIN", verified: true, jwt: "jwt", loggedIn: true},
      notificationData: { message: "test", type: "success", show: true, timed: true },
      lists:{ categories:[] }
    }

    let state = allReducers({}, {type: "INIT"})
    state = allReducers(state, testAction1)
    state = allReducers(state, testAction2)
    state = allReducers(state, testAction3)
    state = allReducers(state, testAction4)
    state = allReducers(state, testAction5)

    state = rootReducer(state, { type: "RESET_STATE" })

    expect(state).toEqual(expectedState)

  })

  it("should reset the app state except for userData and notificationData", () => {

    let state = allReducers({}, {type: "INIT"})
    state = allReducers(state, testAction1)
    state = allReducers(state, testAction2)
    state = allReducers(state, testAction3)
    state = allReducers(state, testAction4)
    state = allReducers(state, testAction5)

    const newState = rootReducer(state, { type: "UNRECOGNISED_ACTION" })

    expect(newState).toEqual(state)

  })
})
