import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import NewAnswerForm from '../newAnswer'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
import history from '../../../history'
import { addAnswer } from '../../actions'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

jest.mock("../../actions")

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

  it("should call addAnswer on submit", () => {

    const currentQuestion = {
      id: 1,
      questionNumber: 1,
      description: ""
    }

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <NewAnswerForm
            addAnswer={addAnswer}
          />
        </Router>
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(addAnswer).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history} >
          <NewAnswerForm
            addAnswer={addAnswer}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
