import React from 'react'
import ReactDOM from 'react-dom'
import { QuizSearch, mapStateToProps } from './quizSearch'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, fireEvent, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { setQuizes, getQuizSearchResults, deleteQuiz, clearQuizes } from './actions'
import { getQuestions } from '../question/actions'
import { hideModal } from '../modal/actions'
import { sessionExpired } from '../utils/session'

jest.mock("../notifications/actions")
jest.mock("./actions")
jest.mock("../question/actions")
jest.mock("../modal/actions")
jest.mock("../utils/session")

const mockStore = configureStore({})

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: { id: 1 },
      quiz: { id: 1, name: "test", description: "test" },
      modalState: { showModal: false, showModal2: false, showModal3: false },
      lists: ["Cat1", "Cat2", "Cat3"],
      notificationData: { message: "", type: "", show: false, timed: true },
      quizes: [
        { id: 1, name: 1, description: "test", category: "test", status: "READY" },
        { id: 2, name: 2, description: "test2", category: "test", status: "READY" }
      ]
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("QuizSearch", () => {

  let store;
  let modalState;
  let userData;
  let lists;
  let quizes;

  beforeEach(() => {
    store = mockStore({
      quiz: { id: 1, name: "test", description: "test" },
      lists: ["Cat1", "Cat2", "Cat3"],
      notificationData: {  },

    })

    modalState = { showModal: false, showModal2: false, showModal3: false }
    userData = { id: 1, jwt: "jwt", permission: "ADMIN", loggedIn: true }
    lists = { categories: ["test", "test2", "test3"] }
    quizes = [
      { id: 1, name: 1, description: "test", category: "test", status: "READY" },
      { id: 2, name: 2, description: "test2", category: "test", status: "READY" }
    ]

    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  })

  it("should render quiz serchByName, searchByCategory forms and results", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuizSearch
            modalState={modalState}
            userData={userData}
            lists={lists}
            quizes={quizes}
            clearQuizes={clearQuizes}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render quiz serchByName, searchByCategory forms and no results", () => {
    const emptyQuizes = []
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuizSearch
            modalState={modalState}
            userData={userData}
            lists={lists}
            quizes={emptyQuizes}
            clearQuizes={clearQuizes}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  describe("handleDelete", () => {

    let component;
    let quizToDelete;

    beforeEach(() => {
      const renderModal1 = { showModal: true, showModal2: false, showModal3: false }
      quizToDelete = { id: 1, name: "test", description: "test" }
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuizSearch
              modalState={renderModal1}
              userData={userData}
              lists={lists}
              quizes={quizes}
              quiz={quizToDelete}
              clearQuizes={clearQuizes}
              hideModal={hideModal}
              deleteQuiz={deleteQuiz}
              setNotification={setNotification}
            />
          </Router>
        </Provider>
      )
    })

    it("should call hideModal, deleteQuiz and then setNotification", () => {
      fireEvent.click(component.getByTestId("modal-delete-button"))
      expect(deleteQuiz).toHaveBeenCalledTimes(1)
    })
  })

  describe("handleStartQuiz", () => {
    it("", () => {
      const renderModal2 = { showModal: false, showModal2: true, showModal3: false }
      const quiz = { id: 1, name: "test", description: "test" }
      const param = { quizId: 1 }
      const component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuizSearch
              modalState={renderModal2}
              userData={userData}
              lists={lists}
              quizes={quizes}
              quiz={quiz}
              clearQuizes={clearQuizes}
              hideModal={hideModal}
              getQuestions={getQuestions}
              setNotification={setNotification}
            />
          </Router>
        </Provider>
      )

      history.push = jest.fn()

      fireEvent.click(component.getByTestId("modal-start-button"))
      expect(getQuestions).toHaveBeenCalledTimes(1)
      expect(getQuestions).toHaveBeenCalledWith("question/findByQuizId", param, "jwt", true)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(history.push).toHaveBeenCalledTimes(1)
    })
  })

})
