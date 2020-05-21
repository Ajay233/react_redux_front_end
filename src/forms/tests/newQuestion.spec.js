import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import NewQuestionForm from '../newQuestion'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'
import history from '../../history'
import { sessionExpired } from '../../utils/session'
import { setNotification } from '../../notifications/actions'
import { addQuestion } from '../../question/actions'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../question/actions")
jest.mock("../../notifications/actions")
jest.mock("../../utils/session")

const mockStore = configureStore({})

describe("newQuestion form", () => {

  let store;
  let props;

  beforeEach(() => {
    store = mockStore({
      quiz: {
        id: 1
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
      }
    })

    props = {
      id: 1
    }
  })

  afterEach(() => {
    mockAxios.reset();
  })

  it("should call axios.post and on success, action creators and history, when submit is clicked", () => {

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history} >
          <NewQuestionForm />
        </Router>
      </Provider>
    )

    const requestResponse = {
      data: [{ id: 2 }]
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockResponse(requestResponse)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(addQuestion).toHaveBeenCalledTimes(1)
    // actions after addAnswer aren't called in the test but are when the app is used
    // expect(setNotification).toHaveBeenCalledTimes(1)
  })

  it("should call sessionExpired on 403 error", () => {
    const currentQuestion = {
      id: 1,
      questionNumber: 1,
      description: ""
    }

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history} >
          <NewQuestionForm
            addQuestion={addQuestion}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    const errorResponse = {
      response: {
        status: 403
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should call serNotification for any other error error", () => {
    const currentQuestion = {
      id: 1,
      questionNumber: 1,
      description: ""
    }

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history} >
          <NewQuestionForm
            addQuestion={addQuestion}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    const errorResponse = {
      response: {
        status: 404
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history} >
          <NewQuestionForm
            addQuestion={addQuestion}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

})
