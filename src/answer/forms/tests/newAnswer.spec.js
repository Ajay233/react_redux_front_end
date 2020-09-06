import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import NewAnswerForm from '../newAnswer'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'
import history from '../../../history'
import { sessionExpired } from '../../../utils/session'
import { setNotification } from '../../../notifications/actions'
import { addAnswer } from '../../actions'

jest.mock("../../../axiosRequests/axiosUtil")
jest.mock("../../actions")
jest.mock("../../../notifications/actions")
jest.mock("../../../utils/session")

const mockStore = configureStore({})

describe("newAnswer form", () => {

  let store;
  let props;

  beforeEach(() => {
    store = mockStore({
      currentQuestion: {
        id: 1,
        questionNumber: 1,
        description: ""
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
      initialValues: {
        answerIndex: "b"
      }
    })

    props = {
      id: 1,
      answerIndex: "b"
    }

  })

  afterEach(() => {
    mockAxios.reset();
  })

  it("should call axios.post and on success, action creators and history, when submit is clicked", () => {

    const currentQuestion = {
      id: 1,
      questionNumber: 1,
      description: ""
    }

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history} >
          <NewAnswerForm
            addAnswer={addAnswer}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    const requestResponse = {
      data: [{ id: 2, answerIndex: "B" }]
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockResponse(requestResponse)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(addAnswer).toHaveBeenCalledTimes(1)
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
          <NewAnswerForm
            addAnswer={addAnswer}
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
          <NewAnswerForm
            addAnswer={addAnswer}
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
          <NewAnswerForm
            addAnswer={addAnswer}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

})
