import React from 'react'
import { Provider } from 'react-redux'
import QuizSearchByCategory from '../findQuizByCategory'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'
import { getQuizSearchResults } from '../../quizSearch/actions'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../quizSearch/actions")

const mockStore = configureStore({})

describe("findQuizByCategory form", () => {
  let store;
  let props;
  let categories;
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

  categories=["cat1", "cat2", "cat3", "cat4"]



  it("should call the axios get request on submit", () => {
    const wrapper = mount(
      <Provider store={store}>
        <QuizSearchByCategory
          userData={props}
          categories={categories}
          getQuizSearchResults={getQuizSearchResults}
        />
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(getQuizSearchResults).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <QuizSearchByCategory
          userData={props}
          categories={categories}
          getQuizSearchResults={getQuizSearchResults}
        />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

});
