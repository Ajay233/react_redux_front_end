import React from 'react'
import { EditUserPrivilege, mapStateToProps } from './editUserPrivilege'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import history from '../history'
import { clearUserResults } from './actions/__mocks__/index'

// jest.mock("./actions")

const mockStore = configureStore({})

describe("User", () => {

  let store;
  let userData;
  let userResults;
  let notificationData;

  beforeEach(() => {
    store = mockStore({
      notificationData:{
        message: "",
        type: "",
        show: false,
        timed: true
      }
    })

    userData = {
      jwt: "jwt"
    }

    userResults = {
      forename: "testForename",
      surname: "testSurname",
      email: "testEmail",
      permission: "USER",
      verified: true
    }

    notificationData = {
      message: "",
      type: "",
      show: false,
      timed: true
    }
  })

  it("should render a user's details using the props passed to it", () => {

    const component = renderer.create(
      <Provider store={store}>
        <EditUserPrivilege
          userData={userData}
          userResults={userResults}
          notificationData={notificationData}
        />
      </Provider>
    )

    expect(component).toMatchSnapshot()

  })

  it("should not render the edit privilege form if the userResults is empty", () => {

    userResults = {}

    const component = renderer.create(
      <Provider store={store}>
        <EditUserPrivilege
          userData={userData}
          userResults={userResults}
          notificationData={notificationData}
        />
      </Provider>
    )

    expect(component).toMatchSnapshot()

  })

  it("should call clearUserResults on unmount", () => {

    const wrapper = mount(
      <Provider store={store}>
        <EditUserPrivilege
          userData={userData}
          clearUserResults={clearUserResults}
          userResults={userResults}
          notificationData={notificationData}
        />
      </Provider>
    )

    wrapper.unmount()

    expect(clearUserResults).toHaveBeenCalledTimes(1)

  })
})

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: {
        jwt: "jwt"
      },
      userResults: {
        forename: "testForename",
        surname: "testSurname",
        email: "testEmail",
        permission: "USER",
        verified: true
      }
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})
