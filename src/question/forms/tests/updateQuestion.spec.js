import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import UpdateQuestionForm from '../updateQuestion'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup } from '@testing-library/react'
import history from '../../../history'
import { setCurrentQuestion, updateQuestion } from '../../actions'

jest.mock('../../actions')

const mockStore = configureStore({})

describe("UpdateQuestionForm", () => {

  let store;

  beforeEach(() => {
    store = mockStore({
      currentQuestion: {
        id: 1,
        quizId: 1,
        questionNumber: 1,
        description: "question"
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
          <UpdateQuestionForm />
        </Router>
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(updateQuestion).toHaveBeenCalledTimes(1)
  })

  it("should call triggerModal when the delete button is clicked", () => {
    const triggerModal = jest.fn()

    const wrapper = render(
      <Provider store={store}>
        <Router history={history}>
          <UpdateQuestionForm
            triggerModal={triggerModal}
          />
        </Router>
      </Provider>
    )

    fireEvent.click(wrapper.getByTestId("delete-question-button"))
    expect(triggerModal).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <UpdateQuestionForm />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

})
