import React from 'react'
import Home from './home'
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import history from './history'

const mockStore = configureStore({})

describe("Home", () => {
  it("should render the home component", () => {

    const store = mockStore({
      notificationData: { message: "", type: "", show: false, timed: true }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Home />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render the home component and a notification", () => {
    const store = mockStore({
      notificationData: { message: "Test", type: "success", show: true, timed: true }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Home />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
