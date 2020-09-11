import React from 'react'
import ReactDOM from 'react-dom'
import { AllQuizes, mapStateToProps } from './allQuizes'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { render, fireEvent, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { getAllQuizes, deleteQuizFromCategory, clearQuizes } from './actions'
import { hideModal } from '../modal/actions'
import { setNotification } from '../notifications/actions'
import { sessionExpired } from '../utils/session'
import { getQuestions } from '../question/actions'
import history from '../history'

const mockStore = configureStore({})

jest.mock('./actions')
jest.mock('../modal/actions')
jest.mock('../notifications/actions')
jest.mock('../utils/session')
jest.mock('../question/actions')
jest.mock('../history')

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: {
        id: 1
      },
      quizes: [
        { id: 1, name: "test", description: "test" },
        { id: 2, name: "test2", description: "test2" }
      ],
      quiz: { id: 1, name: "test", description: "test" },
      modalState: { showModal: false, showModal2: false, showModal3: false }
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})


describe("AllQuizes", () => {

  let store;
  let userData;
  let modalState;
  let quizes;
  let quiz;

  beforeEach(() => {
    store = mockStore({
      userData: {
        id: 1,
        permision: "USER"
      },
      quizes: [
        {
          category: "test1",
          quizList: [
            { id: 1, name: "test", description: "test", category: "test1", status: "READY" },
            { id: 2, name: "test2", description: "test2", category: "test1", status: "DRAFT" }
          ]
        },
        {
          category: "test2",
          quizList: [
            { id: 1, name: "test", description: "test", category: "test2", status: "READY" },
            { id: 2, name: "test2", description: "test2", category: "test2", status: "DRAFT" }
          ]
        },
        {
          category: "test3",
          quizList: []
        }
      ],
      quiz: { id: 1, name: "test", description: "test" },
      modalState: { showModal: true, showModal2: false, showModal3: false },
      notificationData: {
        message: "",
        type: "",
        show: false,
        timed: true
      }
    })

    modalState = { showModal: false, showModal2: false, showModal3: false }

    quizes = [
      {
        category: "test1",
        quizList: [
          { id: 1, name: "test", description: "test", category: "test1", status: "READY" },
          { id: 2, name: "test2", description: "test2", category: "test1", status: "DRAFT" }
        ]
      },
      {
        category: "test2",
        quizList: [
          { id: 1, name: "test", description: "test", category: "test2", status: "READY" },
          { id: 2, name: "test2", description: "test2", category: "test2", status: "DRAFT" }
        ]
      },
      {
        category: "test3",
        quizList: []
      }
    ]

    userData = {
      id: 1,
      permision: "USER",
      jwt: "jwt"
    }

    quiz = { id: 1, name: "test", description: "test" }

    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  })

  it("should render only READY quizes for a user", () => {
    const component = renderer.create(
      <Provider store={store}>
      <Router history={history}>
        <AllQuizes
          userData={userData}
          modalState={modalState}
          quizes={quizes}
          clearQuizes={clearQuizes}
        />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render all quizes regardless of status for ADMIN users", () => {
    userData={
      id: 1,
      permision: "ADMIN"
    }

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <AllQuizes
            userData={userData}
            modalState={modalState}
            quizes={quizes}
            clearQuizes={clearQuizes}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  describe("handleDelete", () => {

    const renderModal1 = { showModal: true, showModal2: false, showModal3: false }

    it("should call action creators when a quiz has been deleted", () => {

      const wrapper = render(
        <Provider store={store}>
          <Router history={history}>
            <AllQuizes
              userData={userData}
              modalState={renderModal1}
              quizes={quizes}
              clearQuizes={clearQuizes}
              hideModal={hideModal}
              deleteQuizFromCategory={deleteQuizFromCategory}
              setNotification={setNotification}
            />
          </Router>
        </Provider>
      )

      fireEvent.click(wrapper.getByTestId("modal-delete-button"))
      expect(deleteQuizFromCategory).toHaveBeenCalledTimes(1)
    })

  })

  describe("handleStartQuiz", () => {
    it("should call getQuestions, hideModal, history.push", () => {

      const renderModal2 = { showModal: false, showModal2: true, showModal3: false }

      const wrapper = render(
        <Provider store={store}>
          <Router history={history}>
            <AllQuizes
              userData={userData}
              modalState={renderModal2}
              quizes={quizes}
              quiz={quiz}
              clearQuizes={clearQuizes}
              hideModal={hideModal}
              deleteQuizFromCategory={deleteQuizFromCategory}
              setNotification={setNotification}
              getQuestions={getQuestions}
            />
          </Router>
        </Provider>
      )

      const param = { quizId: 1 }

      fireEvent.click(wrapper.getByTestId("modal-start-button"))
      expect(getQuestions).toHaveBeenCalledTimes(1)
      expect(getQuestions).toHaveBeenCalledWith("question/findByQuizId", param, "jwt", true)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(history.push).toHaveBeenCalledTimes(1)
      expect(history.push).toHaveBeenCalledWith("/startQuiz")
    })
  })

})
