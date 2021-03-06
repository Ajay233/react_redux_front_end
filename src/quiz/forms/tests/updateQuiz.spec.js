import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import UpdateQuizForm from '../updateQuiz'
import { mount } from 'enzyme'
import mockAxios from 'jest-mock-axios'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup } from '@testing-library/react'
import history from '../../../history'
import { updateQuiz } from '../../actions'

jest.mock('../../actions')

const mockStore = configureStore({})

describe("UpdateQuiz Form", () => {

  let store;

  beforeEach(() => {
    store = mockStore({
      quiz: {
        id: 1,
        name: "testName",
        description: "testDescription",
        category: "testCategory",
        status: "DRAFT"
      },
      lists: {
        categories: ["testCategory", "testCategor2", "testCategor3"]
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

  afterEach(() => {
    mockAxios.reset()
  })

  it("should call action creators on submit success", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <UpdateQuizForm />
        </Router>
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(updateQuiz).toHaveBeenCalledTimes(1)
  })

  it("should call updateStatus when the update status button is clicked", () => {

    const updateStatus = jest.fn()

    const wrapper = render(
      <Provider store={store}>
        <Router history={history}>
          <UpdateQuizForm
            updateStatus={updateStatus}
          />
        </Router>
      </Provider>
    )

    fireEvent.click(wrapper.getByTestId("updateStatus-button"))
    expect(updateStatus).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <UpdateQuizForm />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

})
