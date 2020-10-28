import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import NewQuizForm from '../newQuiz'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import history from '../../../history'
import { createQuiz } from '../../actions'

jest.mock("../../actions")

const mockStore = configureStore({})

describe("newQuiz form", () => {

  let store;

  beforeEach(() => {
    store = mockStore({
      lists: {
        categories: ["test1", "test2", "test3"]
      },
      userData: {
        id: 1,
        forename: "testForename",
        surname: "testSurname",
        email: "testEmail",
        permission: "USER",
        verified: "true",
        jwt: "testJwt",
        loggedIn: true
      },
      notificationData: {
        message: "",
        type: "",
        show: false,
        timed: true
      },
      globals: { loaderState: { show: false, message: "", label: "" } }
    })
  })

  it("should call axios.post and on success, action creators and history, when submit is clicked", () => {

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history} >
          <NewQuizForm />
        </Router>
      </Provider>
    )

    const requestResponse = {
      data: { id: 2 }
    }

    wrapper.find('form').simulate('submit')
    expect(createQuiz).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history} >
          <NewQuizForm />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
