import React from 'react'
import ReactDOM from 'react-dom'
import { UserList, mapStateToProps } from './userList'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { render, fireEvent, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import history from '../history'

import { setUserList, clearUserList } from './actions'
import { setNotification } from '../notifications/actions'

jest.mock('./actions')
jest.mock('../notifications/actions')

const mockStore = configureStore({})

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: {id: 1, jwt: "jwt"},
      listOfUsers: [
        {id: 1},
        {id: 2}
      ]
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("UserList", () => {

  let store;
  let listOfUsers;
  let userData;
  let notificationData;

  beforeEach(() => {
    store = mockStore({
      notificationData: {
        message: "",
        type: "",
        show: false,
        timed: true
      }
    })

    listOfUsers = [
      {
        forename: "testForename1",
        surname: "testSurname1",
        email: "testEmail1",
        permission: "USER",
        verified: "true"
      },
      {
        forename: "testForename2",
        surname: "testSurname2",
        email: "testEmail2",
        permission: "USER",
        verified: "false"
      }
    ]

    userData = {
      jwt: "jwt"
    }

  })

  afterEach(() => {
    clearUserList.mockClear()
  })

  it("should call setUserList on mount", () => {
    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <UserList
            listOfUsers={listOfUsers}
            userData={userData}
            setUserList={setUserList}
            clearUserList={clearUserList}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    expect(setUserList).toHaveBeenCalledTimes(1)
  })

  it("should render a list of users", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <UserList
            listOfUsers={listOfUsers}
            userData={userData}
            setUserList={setUserList}
            clearUserList={clearUserList}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should call clearUserList on unmount", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <UserList
            listOfUsers={listOfUsers}
            userData={userData}
            setUserList={setUserList}
            clearUserList={clearUserList}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    component.unmount()
    expect(clearUserList).toHaveBeenCalledTimes(1)
  })
})
