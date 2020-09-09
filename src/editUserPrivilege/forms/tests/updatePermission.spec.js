import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import UpdatePermission from '../updatePermission'
import { mount } from 'enzyme'
import mockAxios from 'jest-mock-axios'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import history from '../../../history'
import { clearUserResults } from '../../actions'
import { setNotification } from '../../../notifications/actions'
import { sessionExpired } from '../../../utils/session'

jest.mock('../../actions')
jest.mock('../../../notifications/actions')
jest.mock('../../../utils/session')

const mockStore = configureStore({})

describe("UpdatePermission form", () => {

  let store;
  let userResult;
  let userData;

  beforeEach(() => {
    store = mockStore({

    })
  })

  userResult = {
    id: 1,
    forename: "testForename",
    surname: "testSurname",
    email: "testEmail",
    permission: "USER",
    verified: "true"
  }

  userData = {
    id: 1,
    forename: "testForename",
    surname: "testSurname",
    email: "testEmail",
    permission: "USER",
    verified: "true",
    jwt: "testJwt",
    loggedIn: true
  }

  afterEach(() => {
    mockAxios.reset()
  })

  it("should call action creators on submit success", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <UpdatePermission
            userResults={userResult}
            userData={userData}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    const requestResponse = {
      data: "Updated",
      status: 200
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockResponse(requestResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
  })

  it("should call sessionExpired on submit error status 403", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <UpdatePermission
            userResults={userResult}
            userData={userData}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    const errorResponse = {
      response: {
        status: 403
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should call setNotification on any other submit error", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <UpdatePermission
            userResults={userResult}
            userData={userData}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    const errorResponse = {
      response: {
        data: "NOT FOUND",
        status: 404
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <UpdatePermission
            userResults={userResult}
            userData={userData}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

})
