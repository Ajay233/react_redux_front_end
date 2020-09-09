import React from 'react'
import { Provider } from 'react-redux'
import QuizSearchByName from '../findQuizByName'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'
import { getQuizSearchResults } from '../../actions'

jest.mock("../../../axiosRequests/axiosUtil")
jest.mock("../../actions")

const mockStore = configureStore({})

describe("findQuizByName form", () => {
  let store;
  let props;
  let categories;
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

  it("should call the getQuizSearchResults action creator on submit", () => {
    const wrapper = mount(
      <Provider store={store}>
        <QuizSearchByName getQuizSearchResults={getQuizSearchResults} />
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(getQuizSearchResults).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <QuizSearchByName getQuizSearchResults={getQuizSearchResults} />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

});
