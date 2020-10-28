import React from 'react'
import Modal from '../modal/modal'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QuestionView } from './questionView'
import { mapStateToProps } from './questionView'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup } from '@testing-library/react'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { hideModal, showModal, showModal2 } from '../modal/actions'
import { setCurrentAnswer, deleteAnswer } from '../answer/actions'
import { deleteQuestion } from '../question/actions'
import { sessionExpired } from '../utils/session'

jest.mock('../notifications/actions')
jest.mock('../modal/actions')
jest.mock('../answer/actions')
jest.mock('../question/actions')
jest.mock('../utils/session')
jest.mock('../history')

const mockStore = configureStore({})

describe("mapStateToProps", () => {
  it("should map the state to props", () => {
    const appState = {
      userData: { id: 1, jwt: "jwt"},
      quiz: { id: 1, name: "test"},
      currentQuestion: { id: 1, questionNumber: 1},
      answers: [{id: 1, answerIndex: 1}, {id: 2, answerIndex: 2}],
      currentAnswer: {id: 1, answerIndex: 1},
      modalState: { showModal: false }
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("QuestionView", () => {

  let store;
  let modalState;
  let userData;
  let notificationData;
  let quiz;
  let currentQuestion;
  let answers;
  let currentAnswer;
  let component;
  let globals;

  beforeEach(() => {
    modalState = {
      showModal: false,
      showModal2: false,
      showModal3: false
    }

    userData = {
      forename: "testForename",
      surname: "testSurname",
      email: "testEmail",
      permission: "ADMIN"
    }

    notificationData = {
      message: "",
      type: "",
      show: false,
      timed: true
    }

    quiz = {
      id: 1,
      name: "Quiz 1",
      description: "Test quiz",
    }
    currentQuestion = {
      id: 1,
      questionNumber: 1,
      description: "Test question",
    }
    answers = [
      {
        id: 1,
        answerIndex: 1,
        description: "Test answer",
        correctAnswer: false
      },
      {
        id: 2,
        answerIndex: 2,
        description: "Test answer2",
        correctAnswer: true
      }
    ]

    currentAnswer = {
      id: 1,
      answerIndex: 1,
      description: "Test answer",
      correctAnswer: false
    }

    globals = { loaderState: { show: false, message: "", label: "" } }

    store = mockStore({
      userData: {
        forename: "testForename",
        surname: "testSurname",
        email: "testEmail",
        permission: "ADMIN"
      },
      notificationData:{
        message: "",
        type: "",
        show: false,
        timed: true
      }
    })

    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })

  })

  it("should render the QuestionView component, question details and answers", () => {
    const renderedComponent = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuestionView
            modalState={modalState}
            userData={userData}
            notificationData={notificationData}
            currentAnswer={currentAnswer}
            currentQuestion={currentQuestion}
            quiz={quiz}
            answers={answers}
            showModal={showModal}
            showModal2={showModal2}
            hideModal={hideModal}
            setNotification={setNotification}
            deleteQuestion={deleteQuestion}
            globals={globals}
          />
        </Router>
      </Provider>
    );

    expect(renderedComponent).toMatchSnapshot()
  })

  it("should render the QuestionView component, update question form and no answers if the answers array is empty", () => {

    const answers = []

    const renderedComponent = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuestionView
            modalState={modalState}
            userData={userData}
            notificationData={notificationData}
            currentAnswer={currentAnswer}
            currentQuestion={currentQuestion}
            quiz={quiz}
            answers={answers}
            showModal={showModal}
            showModal2={showModal2}
            hideModal={hideModal}
            setNotification={setNotification}
            deleteQuestion={deleteQuestion}
            globals={globals}
          />
        </Router>
      </Provider>
    );

    expect(renderedComponent).toMatchSnapshot()
  })

  describe("handleDeleteQuestion", () => {

    let component

    beforeEach(() => {
      modalState = {
        showModal: false,
        showModal2: true,
        showModal3: false
      }

      component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuestionView
              modalState={modalState}
              userData={userData}
              notificationData={notificationData}
              currentAnswer={currentAnswer}
              currentQuestion={currentQuestion}
              quiz={quiz}
              answers={answers}
              showModal={showModal}
              showModal2={showModal2}
              hideModal={hideModal}
              setNotification={setNotification}
              deleteQuestion={deleteQuestion}
              sessionExpired={sessionExpired}
              globals={globals}
            />
          </Router>
        </Provider>
      );
    })


    it("should call action creators to delete a question, set notification and change url", () => {

      const requestResponse = {
        data: "DELETED"
      }

      fireEvent.click(component.getByTestId("modal-delete-button"))
      expect(deleteQuestion).toHaveBeenCalledTimes(1)
    })
  })

  describe("handleDeleteAnswer", () => {

    let component

    beforeEach(() => {
      modalState = {
        showModal: true,
        showModal2: false,
        showModal3: false
      }

      component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuestionView
              modalState={modalState}
              userData={userData}
              notificationData={notificationData}
              currentAnswer={currentAnswer}
              currentQuestion={currentQuestion}
              quiz={quiz}
              answers={answers}
              showModal={showModal}
              showModal2={showModal2}
              hideModal={hideModal}
              setNotification={setNotification}
              deleteAnswer={deleteAnswer}
              sessionExpired={sessionExpired}
              globals={globals}
            />
          </Router>
        </Provider>
      );
    })

    it("should call action creators to delete an answer, set notification and change url", () => {

      const requestResponse = {
        data: "DELETED"
      }

      fireEvent.click(component.getByTestId("modal-delete-button"))
      expect(deleteAnswer).toHaveBeenCalledTimes(1)
    })
  })
})
