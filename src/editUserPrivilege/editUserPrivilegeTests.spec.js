import React from 'react'
import EditUserPrivilege from './editUserPrivilege'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import history from '../history'
import { clearUserResults } from './actions'

jest.mock("./actions")

const mockStore = configureStore({})

describe("User", () => {
  it("should render a user's details using the props passed to it", () => {

    const store = mockStore({
      userData: {
        jwt: "jwt"
      },
      userResults: {
        forename: "testForename",
        surname: "testSurname",
        email: "testEmail",
        permission: "USER",
        verified: true
      },
      notificationData:{
        message: "",
        type: "",
        show: false,
        timed: true
      }
    })

    const component = renderer.create(
      <Provider store={store}>
        <EditUserPrivilege />
      </Provider>
    )

    expect(component).toMatchSnapshot()

  })

})
