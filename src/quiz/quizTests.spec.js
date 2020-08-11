import React from 'react'
import ReactDOM from 'react-dom'
import { Quiz, mapStateToProps } from './quiz'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { render, fireEvent, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { getQuestions, deleteQuestion, setCurrentQuestion } from '../question/actions'
import { setNotification } from '../notifications/actions'
import { deleteQuiz } from '../quizSearch/actions'
import { getAnswers } from '../answer/actions'
import { setQuiz, updateQuizStatus } from './actions'
import { hideModal, showModal2, showModal } from '../modal/actions'
import { sessionExpired } from '../utils/session'
import history from '../history'

const mockStore = configureStore({})

jest.mock('../question/actions')
jest.mock('../notifications/actions')
jest.mock('../quizSearch/actions')
jest.mock('../answer/actions')
jest.mock('./actions')
jest.mock('../modal/actions')
jest.mock('../utils/session')

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: { id: 1 },
      quiz: { id: 1, name: "test", description: "test" },
      modalState: { showModal: false, showModal2: false, showModal3: false },
      questions: [
        { id: 1, questionNumber: 1, description: "test" },
        { id: 2, questionNumber: 2, description: "test2" }
      ],
      currentQuestion: { id: 1, questionNumber: 1, description: "test" },
      lists: ["Cat1", "Cat2", "Cat3"]
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("Quiz", () => {

  let store;
  let allModalsClosed;
  let currentQuestion;
  let quiz;
  let userData;
  let questions;


  beforeEach(() => {
    store = mockStore({
      lists: { categories: ["Cat1", "Cat2", "Cat3"] },
      notificationData: { message: "", type: "", show: false, timed: true},
      quiz: { id: 1, name: "test", description: "test" }
    })

    allModalsClosed = { showModal: false, showModal2: false, showModal3: false }
    quiz = { id: 1, name: "test", description: "test", category: "test", status: "READY" },
    currentQuestion =  { id: 1, questionNumber: 1, description: "test" }
    userData = { id: 1 }
    questions = [
      { id: 1, questionNumber: 1, description: "test" },
      { id: 2, questionNumber: 2, description: "test2" }
    ]

    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  })

  it("should render the quiz details, 'READY' status and questions for '/viewQuiz' url", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Quiz
            userData={userData}
            modalState={allModalsClosed}
            currentQuestion={currentQuestion}
            quiz={quiz}
            questions={questions}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render the quiz form, 'DRAFT' status and questions for '/editQuiz' url", () => {
    userData = { id: 1, permission: 'ADMIN' }
    let draftQuiz = { id: 1, name: "test", description: "test", category: "test", status: "READY" }
    history.push('/editQuiz')
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Quiz
            userData={userData}
            modalState={allModalsClosed}
            currentQuestion={currentQuestion}
            quiz={draftQuiz}
            questions={questions}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  describe("Delete quiz button", () => {

    it("should call showModal2", () => {
      cleanup()
      userData = { id: 1, permission: 'ADMIN' }
      history.push('/editQuiz')
      const component = render(
        <Provider store={store}>
          <Router history={history}>
            <Quiz
              userData={userData}
              modalState={allModalsClosed}
              currentQuestion={currentQuestion}
              quiz={quiz}
              questions={questions}
              showModal2={showModal2}
            />
          </Router>
        </Provider>
      )

      fireEvent.click(component.getByTestId("delete-quiz-button"))
      expect(showModal2).toHaveBeenCalledTimes(1)
    })
  })

  describe("handleDeleteQuestion", () => {

    let component;
    let stateToRenderModal1

    beforeEach(() => {
      userData = { id: 1, permission: 'ADMIN' }
      stateToRenderModal1 = { showModal: true, showModal2: false, showModal3: false }
      history.push('/editQuiz')

      component = render(
        <Provider store={store}>
          <Router history={history}>
            <Quiz
              userData={userData}
              modalState={stateToRenderModal1}
              currentQuestion={currentQuestion}
              quiz={quiz}
              questions={questions}
              hideModal={hideModal}
              deleteQuestion={deleteQuestion}
              setNotification={setNotification}
            />
          </Router>
        </Provider>
      )
    })

    afterEach(() => {
      hideModal.mockClear()
      setNotification.mockClear()
      sessionExpired.mockClear()
      mockAxios.reset()
    })

    it("should call hideModal and deleteQuestion and then setNotification", () => {
      const requestResponse = {
        data: "DELETED"
      }
      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockResponse(requestResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(deleteQuestion).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledWith("Question deleted", "success", true)
    })

    it("should call sessionExpired if the error status is 403", () => {
      const errorResponse = {
        response: {
          status: 403
        }
      }
      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockError(errorResponse)
      expect(sessionExpired).toHaveBeenCalledTimes(1)
    })

    it("should call hideModal and setNotification for any other error", () => {
      const errorResponse = {
        response: {
          status: 404
        }
      }
      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockError(errorResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledWith("Error - Unable to delete this question", "error", true)
    })
  })

  describe("handleDeleteQuiz", () => {

    let component;
    let stateToRenderModal2

    beforeEach(() => {
      userData = { id: 1, permission: 'ADMIN' }
      stateToRenderModal2 = { showModal: false, showModal2: true, showModal3: false }
      history.push('/editQuiz')

      component = render(
        <Provider store={store}>
          <Router history={history}>
            <Quiz
              userData={userData}
              modalState={stateToRenderModal2}
              currentQuestion={currentQuestion}
              quiz={quiz}
              questions={questions}
              hideModal={hideModal}
              deleteQuiz={deleteQuiz}
              setNotification={setNotification}
            />
          </Router>
        </Provider>
      )
    })

    afterEach(() => {
      hideModal.mockClear()
      setNotification.mockClear()
      sessionExpired.mockClear()
      mockAxios.reset()
    })

    it("should call hideModal and deleteQuiz before redirectng to 'quizSearch' and calling setNotification", () => {
      const requestResponse = {
        data: "DELETED"
      }
      history.push = jest.fn()
      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockResponse(requestResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(deleteQuiz).toHaveBeenCalledTimes(1)
      expect(history.push).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledWith("Quiz deleted", "success", true)
    })

    it("should call sessionExpired if the error status is 403", () => {
      const errorResponse = {
        response: {
          status: 403
        }
      }
      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockError(errorResponse)
      expect(sessionExpired).toHaveBeenCalledTimes(1)
    })

    it("should call hideModal and setNotification for any other error", () => {
      const errorResponse = {
        response: {
          status: 404
        }
      }
      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockError(errorResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledWith("Error - Unable to delete this quiz", "error", true)
    })
  })
})
