import React from 'react'
import { Provider } from 'react-redux'
import ChangePassword from '../changePassword'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'

import { sessionExpired } from '../../../utils/session'
import { setNotification } from '../../../notifications/actions'

jest.mock("../../../axiosRequests/axiosUtil")
jest.mock("../../../utils/session")
jest.mock("../../../notifications/actions")

const mockStore = configureStore({})
// 44,46,47,49,50
describe("ChangePassword", () => {

  let store;
  let props;
  let wrapper;

  beforeEach(() => {
    store = mockStore({})

    props = {
        id: 1,
        email: "email",
        jwt: "Jwt"
    }

    wrapper = mount(
      <Provider store={store}>
        <ChangePassword
          userData={props}
          setNotification={setNotification}
        />
      </Provider>
    )
  })

  afterEach(() => {
  jest.clearAllMocks();
  mockAxios.reset();
  });


  it("should call axios put method when submit is clicked", () => {

    // const data = {
    //   id: 1,
    //   email: "email",
    //   password: "test",
    //   newPassword: "testChange",
    //   retypedPassword: "testChange"
    // }

    // Will need to create a separate store for these to work properly
    // wrapper.find('input').at(0).simulate('change', { target: { name: 'password', value: "test" } })
    // wrapper.find('input').at(1).simulate('change', { target: { name: 'newPassword', value: "testChange" } })
    // wrapper.find('input').at(2).simulate('change', { target: { name: 'retypedPassword', value: "testChange" } })

    const requestResponse = {
      data: "UPDATED",
      status: 200
    }
    wrapper.find('.changePasswordForm').simulate('submit')
    mockAxios.mockResponse(requestResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
  })

  it("should call session expired when a 403 status error is recieved", () => {

    const errorResponse = {
      response: {
        status: 403
      }
    }

    wrapper.find('.changePasswordForm').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(sessionExpired).toHaveBeenCalledTimes(1)

  })

  it("should call setNotification with the appropriate message for 'PASSWORD MISMATCH' error response", () => {

    const errorResponse = {
      response: {
        data: "PASSWORD MISMATCH",
        status: 400
      }
    }
    const msg = "Retyped password did not match the new password"
    wrapper.find('.changePasswordForm').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledWith(msg, "error", true)
  })

  it("should call setNotification with the appropriate message for 'NO MATCH' error response", () => {

    const errorResponse = {
      response: {
        data: "NO MATCH",
        status: 404
      }
    }
    const msg = "The password you provided was incorrect"
    wrapper.find('.changePasswordForm').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledWith(msg, "error", true)
  })

  it("should call setNotification with the appropriate message for 'PASSWORD INCORRECT' error response", () => {

    const errorResponse = {
      response: {
        data: "PASSWORD INCORRECT",
        status: 400
      }
    }
    const msg = "The password you provided was incorrect"
    wrapper.find('.changePasswordForm').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledWith(msg, "error", true)
  })

  it("should call setNotification with the default message fo any other error response", () => {

    const errorResponse = {
      response: {
        data: "Unrecognised error",
        status: 400
      }
    }
    const msg = "An error has occurred please ty again"
    wrapper.find('.changePasswordForm').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledWith(msg, "error", true)
  })

  it("should match the snapshot when rendered", () => {
    let component;

    component = renderer.create(
      <Provider store={store}>
        <ChangePassword userData={props} />
      </Provider>
    )

    expect(component).toMatchSnapshot();
  })

})
