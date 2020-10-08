import React from 'react'
import { Provider } from 'react-redux'
import EditProfileForm from '../editProfile'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'
import { updateUser } from '../../actions'

jest.mock("../../actions")
jest.mock("../../../axiosRequests/axiosUtil")

const mockStore = configureStore({})

describe("editProfile form", () => {
  let store;
  let props;
  beforeEach(() => {
    store = mockStore({
      userData: {
        id: 1,
        forename: "testForename",
        surname: "testSurname",
        email: "testEmail",
        permission: "USER",
        verified: "true",
        jwt: "testJwt",
        loggedIn: true
      }
    })

    props = {
      id: 1,
      forename: "testForename",
      surname: "testSurname",
      email: "testEmail",
      permission: "USER",
      verified: "true",
      jwt: "testJwt",
      loggedIn: true
    }
  })

  it("should call axios.put when onSubmit is clicked", () => {

    const wrapper = mount(
      <Provider store={store}>
        <EditProfileForm userData={props}/>
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(updateUser).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    let component;

    component = renderer.create(
      <Provider store={store}>
        <EditProfileForm userData={props} />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
