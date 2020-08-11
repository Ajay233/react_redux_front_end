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
import mockAxios from 'jest-mock-axios'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { hideModal, showModal, showModal2 } from '../modal/actions'
import { setCurrentAnswer, deleteAnswer } from '../answer/actions'
import { deleteQuestion } from '../question/actions'
import { sessionExpired } from '../utils/session'

jest.mock('../axiosRequests/axiosUtil')
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
      answers: [{id: 1, answerNumber: 1}, {id: 2, answerNumber: 2}],
      currentAnswer: {id: 1, answerNumber: 1},
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
        answerNumber: 1,
        description: "Test answer",
        correctAnswer: false
      },
      {
        id: 2,
        answerNumber: 2,
        description: "Test answer2",
        correctAnswer: true
      }
    ]

    currentAnswer = {
      id: 1,
      answerNumber: 1,
      description: "Test answer",
      correctAnswer: false
    }

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

  afterEach(() => {
    setNotification.mockClear()
    history.push.mockClear()
    mockAxios.reset()
    cleanup()
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
          />
        </Router>
      </Provider>
    );

    expect(renderedComponent).toMatchSnapshot()
  })

  // ** This test has been moved into the update question test as the delete button is now rendered there **

  // it("has a delete queston button that calls showModal2 when clicked", () => {
  //   // history.push("/editQuestion")
  //   // history.location.pathname = "/editQuestion"
  //   console.log(history.location.pathname)
  //   const component = render(
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <QuestionView
  //           modalState={modalState}
  //           userData={userData}
  //           notificationData={notificationData}
  //           currentAnswer={currentAnswer}
  //           currentQuestion={currentQuestion}
  //           quiz={quiz}
  //           answers={answers}
  //           showModal={showModal}
  //           showModal2={showModal2}
  //           hideModal={hideModal}
  //           setNotification={setNotification}
  //           deleteQuestion={deleteQuestion}
  //         />
  //       </Router>
  //     </Provider>
  //   );
  //
  //   // fireEvent.click(component.getByTestId("delete-question-button"))
  //   // expect(showModal2).toHaveBeenCalledTimes(1)
  // })

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
            />
          </Router>
        </Provider>
      );
    })

    afterEach(() => {
      setNotification.mockClear()
      hideModal.mockClear()
      mockAxios.reset()
      cleanup()
    })

    it("should call action creators to delete a question, set notification and change url", () => {

      const requestResponse = {
        data: "DELETED"
      }

      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockResponse(requestResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(deleteQuestion).toHaveBeenCalledTimes(1)
      expect(history.push).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledTimes(1)
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

    it("should call setNotification for any other error", () => {

      const errorResponse = {
        response: {
          status: 404
        }
      }
      const msg = "Error - Unable to delete this question"
      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockError(errorResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledWith(msg, "error", true)

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
            />
          </Router>
        </Provider>
      );
    })

    afterEach(() => {
      setNotification.mockClear()
      hideModal.mockClear()
      sessionExpired.mockClear()
      mockAxios.reset()
      cleanup()
    })

    it("should call action creators to delete an answer, set notification and change url", () => {

      const requestResponse = {
        data: "DELETED"
      }

      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockResponse(requestResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(deleteAnswer).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledTimes(1)
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

    it("should call setNotification for any other error", () => {

      const errorResponse = {
        response: {
          status: 404
        }
      }
      const msg = "Error - Unable to delete this answer"
      fireEvent.click(component.getByTestId("modal-delete-button"))
      mockAxios.mockError(errorResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledWith(msg, "error", true)

    })

  })
})
