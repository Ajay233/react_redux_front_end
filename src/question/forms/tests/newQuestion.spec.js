import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import NewQuestionForm from '../newQuestion'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import history from '../../../history'
import { addQuestion } from '../../actions'

jest.mock("../../actions")

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
      },
      globals: { loaderState: { show: false, message: "", label: "" } },
      notificationData:{
        message: "",
        type: "",
        show: false,
        timed: true
      }
    })

    props = {
      id: 1
    }
  })


  it("should call axios.post and on success, action creators and history, when submit is clicked", () => {

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history} >
          <NewQuestionForm />
        </Router>
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(addQuestion).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history} >
          <NewQuestionForm
            addQuestion={addQuestion}
          />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

})
