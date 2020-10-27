import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { SignUp, mapStateToProps } from './signUp'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import history from '../history'

const mockStore = configureStore({})

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      notificationData: { message: "", type: "", show: false, timed: true }
    }
    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})


describe("SignUp", () => {
  it("should render the signup page and form", () => {
    const store = mockStore({
      notificationData: { message: "", type: "", show: false, timed: true }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <SignUp globals={{loaderState:{show: false}}}/>
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  })

  it("should render the signup page and form and a notification", () => {
    const store = mockStore({
      notificationData: { message: "Test signup worked", type: "success", show: true, timed: true }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <SignUp globals={{loaderState:{show: false}}}/>
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  })
})
