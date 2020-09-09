import React from 'react'
import { Provider } from 'react-redux'
import SignUpForm from '../signUpForm'
import { mount } from 'enzyme'
import mockAxios from 'jest-mock-axios'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { setNotification } from '../../../notifications/actions'

jest.mock("../../../notifications/actions")

const mockStore = configureStore({})

describe("signUpForm", () => {

  let store;

  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {
    setNotification.mockClear()
    mockAxios.reset()
  })

  it("should call setNotification on submit success", () => {
    const wrapper = mount(
      <Provider store={store}>
        <SignUpForm setNotification={setNotification}/>
      </Provider>
    )

    const requestResponse = {
      data: "Welcome to the quiz app",
      status: 200
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockResponse(requestResponse)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
  })

  it("should call setNotification on submit error", () => {
    const wrapper = mount(
      <Provider store={store}>
        <SignUpForm setNotification={setNotification}/>
      </Provider>
    )

    const errorResponse = {
      data: "That email already has an account",
      status: 404
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(setNotification).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <SignUpForm setNotification={setNotification}/>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
