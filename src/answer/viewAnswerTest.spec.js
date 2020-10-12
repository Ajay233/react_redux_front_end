import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AnswerView, mapStateToProps  } from './viewAnswer'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import history from '../history'

import { setNotification } from '../notifications/actions'

jest.mock('../notifications/actions')

const mockStore = configureStore({})

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: { id: 1, jwt: "jwt", loggedIn: true },
      currentAnswer: { id: 1 }
    }

    const componentState = mapStateToProps(appState)
    expect(appState).toEqual(componentState)
  })
})

describe("AnswerView", () => {
  it("should render the NewAnswerForm", () => {
    const userData = { id: 1, jwt: "jwt", loggedIn: true }
    const store = mockStore({
      notificationData: {
        message: "",
        type: "",
        show: false,
        timed: true
      }
    })
    history.push("/newAnswer")
    const component = renderer.create(
      <Provider store={store}>
      <Router history={history}>
        <AnswerView setNotification={setNotification} userData={userData}/>
      </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render the UpdateAnswerForm", () => {
    const userData = { id: 1, jwt: "jwt", loggedIn: true }
    const store = mockStore({
      notificationData: {
        message: "",
        type: "",
        show: false,
        timed: true
      },
      currentAnswer: {
        id: 1,
        answerIndex: 1,
        description: "testDescription",
        correctAnswer: true
      }
    })
    history.push("/updateAnswer")
    const component = renderer.create(
      <Provider store={store}>
      <Router history={history}>
        <AnswerView setNotification={setNotification} userData={userData}/>
      </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
