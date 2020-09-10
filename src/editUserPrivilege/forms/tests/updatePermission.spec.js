import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import UpdatePermission from '../updatePermission'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import history from '../../../history'
import { clearUserResults, updatePrivillege } from '../../actions'

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

  it("should call action creators on submit success", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <UpdatePermission
            userResults={userResult}
            userData={userData}
            updatePrivillege={updatePrivillege}
          />
        </Router>
      </Provider>
    )

    const requestResponse = {
      data: "Updated",
      status: 200
    }

    wrapper.find('form').simulate('submit')
    expect(updatePrivillege).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <UpdatePermission
            userResults={userResult}
            userData={userData}
            updatePrivillege={updatePrivillege}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
