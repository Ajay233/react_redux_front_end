import React from 'react'
import { Router } from 'react-router-dom'
import Questions from './questions'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { deleteQuestion, setCurrentQuestion } from '../question/actions'
import { setNotification } from '../notifications/actions'
import { getAnswers } from '../answer/actions'
import { showModal } from '../modal/actions'
import history from '../history'

jest.mock("../notifications/actions")
jest.mock("../answer/actions")
jest.mock("../question/actions")
jest.mock("../modal/actions")


describe("Questions", () => {

  let questions;

  beforeEach(() => {
    questions = [
      {
        id: 1,
        questionNumber: 1,
        description: "testDescription"
      },
      {
        id: 2,
        questionNumber: 2,
        description: "testDescription2"
      },
      {
        id: 3,
        questionNumber: 3,
        description: "testDescription3"
      }
    ]
  })

  it("should render a list of questions with only the view option for a READ-ONLY user", () => {

    const userData = {
      jwt: "jwt",
      permission: "READ-ONLY"
    }

    const component = renderer.create(
      <Router history={history}>
        <Questions
          questions={questions}
          userData={userData}
          getAnswers={getAnswers}
          setCurrentQuestion={setCurrentQuestion}
          setNotification={setNotification}
          deleteQuestion={deleteQuestion}
          showModal={showModal}
        />
      </Router>
    );

    expect(component).toMatchSnapshot()
  })

  it("should render a list of questions with delete and edit options for an ADMIN user", () => {

    const userData = {
      jwt: "jwt",
      permission: "ADMIN"
    }

    const component = renderer.create(
      <Router history={history}>
        <Questions
          questions={questions}
          userData={userData}
          getAnswers={getAnswers}
          setCurrentQuestion={setCurrentQuestion}
          setNotification={setNotification}
          deleteQuestion={deleteQuestion}
          showModal={showModal}
        />
      </Router>
    );
    expect(component).toMatchSnapshot()
  })
})
