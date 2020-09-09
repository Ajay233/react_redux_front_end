import React from 'react'
import { Provider } from 'react-redux'
import FindUserByEmail from '../findUserByEmail'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { setUserResults } from '../../actions'

jest.mock("../../actions")

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

  it("should call axios.get and then call the setUserResults action creator on submit", () => {
    const wrapper = mount(
      <Provider store={store}>
        <FindUserByEmail
          userData={props}
          setUserResults={setUserResults}
        />
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(setUserResults).toHaveBeenCalledTimes(1)
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
