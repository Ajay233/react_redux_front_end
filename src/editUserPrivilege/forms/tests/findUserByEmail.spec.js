import React from 'react'
import { Provider } from 'react-redux'
import FindUserByEmail from '../findUserByEmail'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'
import { setUserResults } from '../../actions'
import { sessionExpired } from '../../../utils/session'
import { setNotification } from '../../../notifications/actions'

jest.mock("../../../axiosRequests/axiosUtil")
jest.mock("../../actions")
jest.mock("../../../notifications/actions")
jest.mock("../../../utils/session")

const mockStore = configureStore({})

describe("findUserByEmail form", () => {
  let store;
  let props;
  beforeEach(() => {
    store = mockStore({})

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

  afterEach(() => {
    mockAxios.reset();
  })

  it("should call axios.get and then call the setUserResults action creator on submit", () => {
    const wrapper = mount(
      <Provider store={store}>
        <FindUserByEmail
          userData={props}
          setUserResults={setUserResults}
        />
      </Provider>
    )

    const requestResponse = {
      data: {
        id: 2,
        forename: "testForename2",
        surname: "testSurname2",
        email: "testEmail2",
        permission: "USER",
        verified: "true",
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockResponse(requestResponse)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(setUserResults).toHaveBeenCalledTimes(1)
  })

  it("should call sessionExpired following failed request with 403 error status", () => {
    const wrapper = mount(
      <Provider store={store}>
        <FindUserByEmail
          userData={props}
          setUserResults={setUserResults}
        />
      </Provider>
    )

    const errorResponse = {
      response: {
        status: 403
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should call the setNotification action creator for any other error", () => {
    const wrapper = mount(
      <Provider store={store}>
        <FindUserByEmail
          userData={props}
          setUserResults={setUserResults}
          setNotification={setNotification}
        />
      </Provider>
    )

    const errorResponse = {
      response: {
        status: 404
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <FindUserByEmail
          userData={props}
          setUserResults={setUserResults}
        />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

});
