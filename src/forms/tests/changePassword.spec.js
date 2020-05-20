import React from 'react'
import { Provider } from 'react-redux'
import ChangePassword from '../changePassword'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'

jest.mock("../../axiosRequests/axiosUtil")

const mockStore = configureStore({})

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
        <ChangePassword userData={props} />
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
    wrapper.find('.changePasswordForm').simulate('submit')

    expect(mockAxios.put).toHaveBeenCalledTimes(1)

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
