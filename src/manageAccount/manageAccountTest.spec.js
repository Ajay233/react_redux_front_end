import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import Modal from '../modal/modal'
import { ManageAccount, mapStateToProps } from './ManageAccount'
import configureStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { logOut } from '../authentication/actions'
import { showModal, hideModal } from '../modal/actions'
import { sessionExpired } from '../utils/session'

const mockStore = configureStore({})

jest.mock("../axiosRequests/axiosUtil")
jest.mock("../notifications/actions")
jest.mock("../authentication/actions")
jest.mock("../utils/session")
jest.mock("../modal/actions")
jest.mock("../history")

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: {
        forename: "testForename",
        surname: "testSurname",
        email: "testEmail"
      },
      notificationData:{
        message: "",
        type: "",
        show: false,
        timed: true
      },
      modalState: {
        showModal: false,
        showModal2: false,
        showModal3: false
      }
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("Manage Account", () => {

  let modalState;
  let userData;
  let notificationData;
  let store;

  beforeEach(() => {
    modalState = {
      showModal: false,
      showModal2: false,
      showModal3: false
    }

    userData = {
      forename: "testForename",
      surname: "testSurname",
      email: "testEmail"
    }

    notificationData = {
      message: "",
      type: "",
      show: false,
      timed: true
    }

    store = mockStore({
      userData: {
        forename: "testForename",
        surname: "testSurname",
        email: "testEmail"
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
    mockAxios.reset()
  })

  it("should call showModal when delete account is clicked", () => {

    const component = renderer.create(
      <Provider store={store}>
        <ManageAccount
          modalState={modalState}
          userData={userData}
          notificationData={notificationData}
        />
      </Provider>
    );

    expect(component).toMatchSnapshot()
  })

  it("should call logOut, history.push and setNotification when an account is deleted", () => {
    const component = render(
      <Provider store={store}>
        <ManageAccount
          modalState={modalState}
          userData={userData}
          notificationData={notificationData}
          showModal={showModal}
        />
      </Provider>
    );

    fireEvent.click(component.getByTestId("delete-account"))
    expect(showModal).toHaveBeenCalledTimes(1)
  })

  it("should call logOut, history.push and setNotification when an account is deleted", () => {
    modalState = {
      showModal: true,
      showModal2: false,
      showModal3: false
    }

    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <ManageAccount
            modalState={modalState}
            userData={userData}
            notificationData={notificationData}
            showModal={showModal}
            logOut={logOut}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    );

    const requestResponse = {
      data: "DELETED"
    }

    fireEvent.click(component.getByTestId("modal-delete-button"))
    mockAxios.mockResponse(requestResponse)
    expect(logOut).toHaveBeenCalledTimes(1)
    expect(history.push).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
  })

  it("should call sessionExpired when a 403 error status is recieved", () => {
    modalState = {
      showModal: true,
      showModal2: false,
      showModal3: false
    }

    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <ManageAccount
            modalState={modalState}
            userData={userData}
            notificationData={notificationData}
            showModal={showModal}
            logOut={logOut}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    );

    const errorResponse = {
      response: {
        status: 403
      }
    }

    fireEvent.click(component.getByTestId("modal-delete-button"))
    mockAxios.mockError(errorResponse)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should call setNotification for any other error status", () => {
    modalState = {
      showModal: true,
      showModal2: false,
      showModal3: false
    }

    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <ManageAccount
            modalState={modalState}
            userData={userData}
            notificationData={notificationData}
            showModal={showModal}
            logOut={logOut}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    );

    const errorResponse = {
      response: {
        status: 404
      }
    }

    fireEvent.click(component.getByTestId("modal-delete-button"))
    mockAxios.mockError(errorResponse)
    expect(setNotification).toHaveBeenCalledTimes(1)
  })
})
