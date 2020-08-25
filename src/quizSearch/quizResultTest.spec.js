import React from 'react'
import ReactDOM from 'react-dom'
import { QuizResult, mapStateToProps } from './quizResult'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { render, fireEvent, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import history from '../history'

import { setQuiz } from '../quiz/actions'
import { setNotification } from '../notifications/actions'
import { deleteQuiz } from './actions'
import { showModal, showModal2 } from '../modal/actions'
import { getQuestions, setCurrentQuestion } from '../question/actions'
import { getAnswers } from '../answer/actions'

jest.mock("../quiz/actions")
jest.mock("../notifications/actions")
jest.mock("./actions")
jest.mock("../modal/actions")
jest.mock("../question/actions")
jest.mock("../answer/actions")

const mockStore = configureStore({})

describe("mapStateToProps", () => {
  it("should mapStateToProps", () => {
    const appState = {
      userData: { id: 1, permission: "USER" },
      modalState: { showModal: false, showModal2: false, showModal3: false}
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("QuizResult", () => {

  let store;
  let quiz;
  beforeEach(() => {
    quiz = { id: 1, name: "test", description: "test", category: "test", status: "READY" }
  })

  afterEach(() => {
    showModal2.mockClear()
    showModal.mockClear()
    setQuiz.mockClear()
  })

  it("should render a quiz result and the appropriate options for a user with USER permission", () => {

    store = mockStore({
      userData: { id: 1, permission: "USER", jwt: "jwt" },
      modalState: { showModal: false, showModal2: false, showModal3: false}
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuizResult
            quiz={quiz}
            permission={"USER"}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render a quiz result and the appropriate options for a user with READ-ONLY permission", () => {
    store = mockStore({
      userData: { id: 1, permission: "READ-ONLY" },
      modalState: { showModal: false, showModal2: false, showModal3: false}
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuizResult
            quiz={quiz}
            permission={"READ-ONLY"}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render a quiz result and the appropriate options for a user with ADMIN permission", () => {
    store = mockStore({
      userData: { id: 1, permission: "ADMIN" },
      modalState: { showModal: false, showModal2: false, showModal3: false}
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuizResult
            quiz={quiz}
            permission={"ADMIN"}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  describe("handleStart", () => {

    it("should call", () => {
      const component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuizResult
              quiz={quiz}
              permission={"USER"}
              setQuiz={setQuiz}
              showModal2={showModal2}
            />
          </Router>
        </Provider>
      )

      fireEvent.click(component.getByText("Start"))
      expect(setQuiz).toHaveBeenCalledTimes(1)
      expect(setQuiz).toHaveBeenCalledWith(quiz)
      expect(showModal2).toHaveBeenCalledTimes(1)
    })
  })

  describe("handleView", () => {
    it("should call", () => {

      const userDataProp = { id: 1, permission: "USER", jwt: "jwt" }

      const component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuizResult
              quiz={quiz}
              permission={"READ-ONLY"}
              setQuiz={setQuiz}
              getQuestions={getQuestions}
              userData={userDataProp}
              setNotification={setNotification}
            />
          </Router>
        </Provider>
      )

      const param = { quizId: 1 }

      fireEvent.click(component.getByText("View"))
      expect(getQuestions).toHaveBeenCalledTimes(1)
      expect(getQuestions).toHaveBeenCalledWith("question/findByQuizId", param, "jwt")
      expect(setQuiz).toHaveBeenCalledTimes(1)
      expect(setQuiz).toHaveBeenCalledWith(quiz)
    })
  })

  describe("handleDelete", () => {
    it("should call", () => {
      const component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuizResult
              quiz={quiz}
              permission={"ADMIN"}
              setQuiz={setQuiz}
              showModal={showModal}
            />
          </Router>
        </Provider>
      )

      fireEvent.click(component.getByText("Delete"))
      expect(setQuiz).toHaveBeenCalledTimes(1)
      expect(setQuiz).toHaveBeenCalledWith(quiz)
      expect(showModal).toHaveBeenCalledTimes(1)
    })
  })

})
