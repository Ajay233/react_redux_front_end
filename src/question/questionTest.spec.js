import React from 'react'
import { Router } from 'react-router-dom'
import { Question } from './question'
import { shallow, mount } from 'enzyme'
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


describe("Question", () => {

  let question;

  beforeEach(() => {
    question = {
      id: 1,
      questionNumber: 1,
      description: "testDescription"
    }
  })

  it("should render a question along with view option for READ-ONLY users", () => {
    const userData={
      jwt: "jwt",
      permission: "READ-ONLY"
    }

    const component = renderer.create(
      <Router history={history}>
        <Question
          question={question}
          userData={userData}
        />
      </Router>
    );

    expect(component).toMatchSnapshot()
  })

  it("should render a question along with edit and delete options for ADMIN users", () => {
    const userData={
      jwt: "jwt",
      permission: "ADMIN"
    }

    const component = renderer.create(
      <Router history={history}>
        <Question
          question={question}
          userData={userData}
        />
      </Router>
    );

    expect(component).toMatchSnapshot()
  })
})

describe("handleDelete", () => {
  it("should call setCurrentQuestion and showModal", () => {

    setCurrentQuestion.mockClear()
    history.push('/editQuiz')
    const question = {
      id: 1,
      questionNumber: 1,
      description: "testDescription"
    }

    const userData={
      jwt: "jwt",
      permission: "SUPER-USER"
    }

    const wrapper = mount(
      <Router history={history}>
        <Question
          question={question}
          userData={userData}
          setCurrentQuestion={setCurrentQuestion}
          showModal={showModal}
        />
      </Router>
    );

    // wrapper.instance().handleDelete()
    const deleteButton = wrapper.find('#deleteQuestionRow')
    deleteButton.at(1).simulate('click')
    expect(setCurrentQuestion).toHaveBeenCalledTimes(1)
    expect(setCurrentQuestion).toHaveBeenCalledWith(question)
    expect(showModal).toHaveBeenCalledTimes(1)
  })
})

describe("handleView", () => {
  it("should call setCurrentQuestion and getAnswers", () => {

    setCurrentQuestion.mockClear()
    history.push('/editQuiz')
    const question = {
      id: 1,
      questionNumber: 1,
      description: "testDescription"
    }

    const userData={
      jwt: "jwt",
      permission: "SUPER-USER"
    }

    const wrapper = mount(
      <Router history={history}>
        <Question
          question={question}
          userData={userData}
          getAnswers={getAnswers}
          setCurrentQuestion={setCurrentQuestion}
          setNotification={setNotification}
        />
      </Router>
    );

    // wrapper.instance().handleView()
    const deleteButton = wrapper.find('#editQuestionRow')
    deleteButton.at(1).simulate('click')
    expect(getAnswers).toHaveBeenCalledTimes(1)
    expect(getAnswers).toHaveBeenCalledWith({ questionId: 1 }, "jwt")
    expect(setCurrentQuestion).toHaveBeenCalledTimes(1)
    expect(setCurrentQuestion).toHaveBeenCalledWith(question)
  })
})
