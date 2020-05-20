import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import LoginForm from '../loginForm'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'
import history from '../../history'
import { setUser } from '../../authentication/actions'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../authentication/actions")

const mockStore = configureStore({})

describe("login form", () => {
  
  let store;
  let props;

  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {
    mockAxios.reset();
  })

  it("should call the setUser action creator when submit is clicked", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm setUser={setUser}/>
        </Router>
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(setUser).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm setUser={setUser}/>
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

});
