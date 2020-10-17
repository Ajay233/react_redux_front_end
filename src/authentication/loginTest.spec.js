import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { Login, mapStateToProps } from './login'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import history from '../history'

const mockStore = configureStore({})

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: { id: 1, jwt: "jwt" },
      verificationProcess: { completionStatus: "test", token: "test", error: {} }
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("Login", () => {
  it("should render the login form without notification", () => {

    const store = mockStore({
      userData: { id: 1, jwt: "jwt" },
      verificationProcess: { completionStatus: "test", token: "test", error: {} },
      notificationData: { message: "", type: "", show: false, timed: true },
      globals: { showLoader: false }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Login globals={{ showLoader: false }}/>
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  })

  it("should render the login form with notification", () => {

    const store = mockStore({
      userData: { id: 1, jwt: "jwt" },
      verificationProcess: { completionStatus: "test", token: "test", error: {} },
      notificationData: { message: "Username or passord incorrect", type: "error", show: true, timed: true },
      globals: { showLoader: false }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Login globals={{ showLoader: false }}/>
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  })
})
