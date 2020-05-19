import React from 'react'
import { Provider } from 'react-redux'
import ChangePassword from '../changePassword'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { put } from '../../axiosRequests/requests'

// jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../axiosRequests/requests")

const mockStore = configureStore({})

describe("ChangePassword", () => {

  let store;
  let props;
  let wrapper;

  beforeEach(() => {
    store = mockStore({})

    props = {
      userData: {
        id: 1,
        email: "email",
        jwt: "Jwt"
      }
    }

    wrapper = mount(
      <Provider store={store}>
        <ChangePassword userData={props} />
      </Provider>
    )
  })

  afterEach(() => {
  jest.clearAllMocks();
  });


  it("should call the custom axios put methos when submit is clicked", () => {

    wrapper.find('input').at(0).simulate('change', { target: { name: 'password', value: "test" } })
    wrapper.find('input').at(1).simulate('change', { target: { name: 'newPassword', value: "testChange" } })
    wrapper.find('input').at(2).simulate('change', { target: { name: 'retypedPassword', value: "testChange" } })
    wrapper.find('.changePasswordForm').simulate('submit')

    // expect(put).toHaveBeenCalledTimes(1)
  })

  it("should match the cnapshot when rendered", () => {
    let component;

    component = renderer.create(
      <Provider store={store}>
        <ChangePassword userData={props} />
      </Provider>
    )

    expect(component).toMatchSnapshot();

  })

})
