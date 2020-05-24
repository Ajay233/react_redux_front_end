import React from 'react'
import User from './user'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import history from '../history'

describe("User", () => {
  it("should render a user's details using the props passed to it", () => {
    const userResults = {
      forename: "testForename",
      surname: "testSurname",
      email: "testEmail",
      permission: "USER",
      verified: "true"
    }
    const component = renderer.create(
      <User userResults={userResults} />
    )

    expect(component).toMatchSnapshot()
  })
})
