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
import { setQuiz } from '../../actions'
import { setNotification } from '../../../notifications/actions'
import { sessionExpired } from '../../../utils/session'

jest.mock('../../actions')
jest.mock('../../../notifications/actions')
jest.mock('../../../utils/session')

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

    const requestResponse = {
      data: {
        id: 1,
        name: "updatedName",
        description: "updatedDescription",
        category: "updatedCategory",
        status: "READY"
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockResponse(requestResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(setQuiz).toHaveBeenCalledTimes(1)
    expect(setQuiz).toHaveBeenCalledWith(requestResponse.data)
  })

  it("should call sessionExpired on submit error status 403", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <UpdateQuizForm />
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
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(sessionExpired).toHaveBeenCalledTimes(1)
  })

  it("should call setNotification on any other submit error", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <UpdateQuizForm />
        </Router>
      </Provider>
    )

    const errorResponse = {
      response: {
        data: "NOT FOUND",
        status: 404
      }
    }

    wrapper.find('form').simulate('submit')
    mockAxios.mockError(errorResponse)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    expect(setNotification).toHaveBeenCalledTimes(1)
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
