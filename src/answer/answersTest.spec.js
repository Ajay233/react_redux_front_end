import React from 'react'
import { Router } from 'react-router-dom'
import Answers from './answers'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { setCurrentAnswer, deleteAnswer } from './actions'
import { setNotification } from '../notifications/actions'
import { showModal } from '../modal/actions'
import history from '../history'


jest.mock("./actions")
jest.mock("../notifications/actions")
jest.mock("../modal/actions")

describe("", () => {

  let answers;

  beforeEach(() => {
    answers = [
      {
        id: 1,
        answerIndex: 1,
        description: "testDescription",
        correctAnswer: false
      },
      {
        id: 2,
        answerIndex: 2,
        description: "testDescription2",
        correctAnswer: true
      },
      {
        id: 3,
        answerIndex: 3,
        description: "testDescriptio3",
        correctAnswer: false
      }
    ]
  })

  it("should render a list of answers with options for ADMIN users", () => {

    const userData = {
      permission: "ADMIN",
      jwt: "jwt"
    }

    const component = renderer.create(
      <Router history={history}>
        <Answers
          answers={answers}
          userData={userData}
          setCurrentAnswer={setCurrentAnswer}
          setNotification={setNotification}
          deleteAnswer={deleteAnswer}
          showModal={showModal}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render a list of answers without options for READ-ONLY users", () => {

    const userData = {
      permission: "READ-ONLY",
      jwt: "jwt"
    }

    const component = renderer.create(
      <Router history={history}>
        <Answers
          answers={answers}
          userData={userData}
          setCurrentAnswer={setCurrentAnswer}
          setNotification={setNotification}
          deleteAnswer={deleteAnswer}
          showModal={showModal}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })
})
