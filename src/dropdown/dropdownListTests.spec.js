import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import DropdownList from './dropdownList'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import history from '../history'

import { setNotification } from '../notifications/actions'
import { logOut } from '../authentication/actions'
import { getAllQuizes } from '../quizSearch/actions'

jest.mock("../history")
jest.mock("../authentication/actions")
jest.mock("../notifications/actions")
jest.mock("../quizSearch/actions")

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe("DropdownList", () => {

  let store;
  let wrapper;

  beforeEach(() => {

    store = mockStore({
      userData: {
        permission: "USER",
        loggedIn: true
      }
    })

    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <DropdownList
            logOut={logOut}
            setNotification={setNotification}
            getAllQuizes={getAllQuizes}
          />
        </Router>
      </Provider>
    )
  })

  it("should call action creators and push a new location pathname on logout", () => {
    wrapper.find('button').simulate('click')
    expect(logOut).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
    expect(history.push).toHaveBeenCalledTimes(1)

  })

  it("should call getAllQuizes when browse all is clicked", () => {
    wrapper.find('Link').at(1).simulate('click')
    expect(getAllQuizes).toHaveBeenCalledTimes(1)
  })

  it("should render only login and create account if user is not logged in", () => {
    store = mockStore({
      userData: {
        permission: "USER",
        loggedIn: false
      }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <DropdownList
            logOut={logOut}
            setNotification={setNotification}
            getAllQuizes={getAllQuizes}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render only USER options for user with USER permission", () => {
    store = mockStore({
      userData: {
        permission: "USER",
        loggedIn: true
      }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <DropdownList
            logOut={logOut}
            setNotification={setNotification}
            getAllQuizes={getAllQuizes}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render only READ-ONLY options for user with READ-ONLY permission", () => {
    store = mockStore({
      userData: {
        permission: "READ-ONLY",
        loggedIn: true
      }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <DropdownList
            logOut={logOut}
            setNotification={setNotification}
            getAllQuizes={getAllQuizes}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render only ADMIN options for user with ADMIN permission", () => {
    store = mockStore({
      userData: {
        permission: "ADMIN",
        loggedIn: true
      }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <DropdownList
            logOut={logOut}
            setNotification={setNotification}
            getAllQuizes={getAllQuizes}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

})
