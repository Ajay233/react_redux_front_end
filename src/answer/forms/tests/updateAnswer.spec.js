import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import UpdateAnswerForm from '../updateAnswer'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
import history from '../../../history'
import { updateAnswer } from '../../actions'

jest.mock('../../actions')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe("UpdateAnswerForm", () => {

  let store;

  beforeEach(() => {
    store = mockStore({
      currentAnswer: {
        id: 1,
        answerIndex: "a",
        description: "testAnswer"
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
  })

  it("should call action creators on submit success", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <UpdateAnswerForm />
        </Router>
      </Provider>
    )

    const requestResponse = {
      data: [{
        id: 1,
        answerIndex: "b",
        description: "updatedAnswer"
      }],
      status: 200
    }

    wrapper.find('form').simulate('submit')
    expect(updateAnswer).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <UpdateAnswerForm />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

})
