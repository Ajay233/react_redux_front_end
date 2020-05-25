import React from 'react'
import ReactDOM from 'react-dom'
import { AllQuizes, mapStateToProps } from './allQuizes'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { render, fireEvent, cleanup } from '@testing-library/react'

import { getAllQuizes, deleteQuiz, clearQuizes } from '../quizSearch/actions'
import { hideModal } from '../modal/actions'
import { setNotification } from '../notifications/actions'
import { sessionExpired } from '../utils/session'

const mockStore = configureStore({})

jest.mock('../quizSearch/actions')
jest.mock('../modal/actions')
jest.mock('../notifications/actions')
jest.mock('../utils/session')

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


// 23,24,37,38,39
describe("AllQuizes", () => {

  let store;
  let userData;
  let modalState;
  let quizes;

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
      permision: "USER"
    }

    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  })

  it("should render only READY quizes for a user", () => {
    const wrapper = render(
      <Provider store={store}>
        <AllQuizes
          userData={userData}
          modalState={modalState}
          quizes={quizes}
          clearQuizes={clearQuizes}
        />
      </Provider>
    )


  })

  it("should render all quizes regardless of status for ADMIN users", () => {
    userData={
      id: 1,
      permision: "ADMIN"
    }

    const wrapper = render(
      <Provider store={store}>
        <AllQuizes
          userData={userData}
          modalState={modalState}
          quizes={quizes}
          clearQuizes={clearQuizes}
        />
      </Provider>
    )

  })

  describe("handleDelete", () => {

    afterEach(() => {
      setNotification.mockClear()
      hideModal.mockClear()
      mockAxios.reset()
    })

    it("should call action creators when a quiz has been deleted", () => {

      const wrapper = render(
        <Provider store={store}>
          <AllQuizes
            userData={userData}
            modalState={modalState}
            quizes={quizes}
            clearQuizes={clearQuizes}
            hideModal={hideModal}
            deleteQuiz={deleteQuiz}
            setNotification={setNotification}
          />
        </Provider>
      )

      const requestResponse = {
        data: "DELETED"
      }

      fireEvent.click(wrapper.getByTestId("modal-delete-button"))
      mockAxios.mockResponse(requestResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(deleteQuiz).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledWith("Quiz deleted", "success", true)
    })

    it("should call sessionExpired if the error status is 403", () => {

      const wrapper = render(
        <Provider store={store}>
          <AllQuizes
            userData={userData}
            modalState={modalState}
            quizes={quizes}
            clearQuizes={clearQuizes}
            hideModal={hideModal}
            deleteQuiz={deleteQuiz}
            setNotification={setNotification}
          />
        </Provider>
      )

      const errorResponse = {
        response: {
          status: 403
        }
      }

      fireEvent.click(wrapper.getByTestId("modal-delete-button"))
      mockAxios.mockError(errorResponse)
      expect(sessionExpired).toHaveBeenCalledTimes(1)
    })

    it("should call setNotification for any other error", () => {

      const wrapper = render(
        <Provider store={store}>
          <AllQuizes
            userData={userData}
            modalState={modalState}
            quizes={quizes}
            clearQuizes={clearQuizes}
            hideModal={hideModal}
            deleteQuiz={deleteQuiz}
            setNotification={setNotification}
          />
        </Provider>
      )

      const errorResponse = {
        response: {
          status: 404
        }
      }

      fireEvent.click(wrapper.getByTestId("modal-delete-button"))
      mockAxios.mockError(errorResponse)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledTimes(1)
      expect(setNotification).toHaveBeenCalledWith("Error - Unable to delete this quiz", "error", true)
    })
  })


})
