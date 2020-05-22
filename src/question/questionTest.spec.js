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

//pass in questions, userData
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

    const question = {
      id: 1,
      questionNumber: 1,
      description: "testDescription"
    }

    const userData={
      jwt: "jwt",
      permission: "ADMIN"
    }

    const wrapper = shallow(
      <Question
        question={question}
        userData={userData}
        setCurrentQuestion={setCurrentQuestion}
        showModal={showModal}
      />
    );

    wrapper.instance().handleDelete()
    expect(setCurrentQuestion).toHaveBeenCalledTimes(1)
    expect(setCurrentQuestion).toHaveBeenCalledWith(question)
    expect(showModal).toHaveBeenCalledTimes(1)
  })
})

describe("handleView", () => {
  it("should call setCurrentQuestion and getAnswers", () => {

    setCurrentQuestion.mockClear()

    const question = {
      id: 1,
      questionNumber: 1,
      description: "testDescription"
    }

    const userData={
      jwt: "jwt",
      permission: "ADMIN"
    }

    const wrapper = shallow(
      <Question
        question={question}
        userData={userData}
        getAnswers={getAnswers}
        setCurrentQuestion={setCurrentQuestion}
      />
    );

    wrapper.instance().handleView()
    expect(getAnswers).toHaveBeenCalledTimes(1)
    expect(getAnswers).toHaveBeenCalledWith("answer/findByQuestionId", { questionId: 1 }, "jwt")
    expect(setCurrentQuestion).toHaveBeenCalledTimes(1)
    expect(setCurrentQuestion).toHaveBeenCalledWith(question)
  })
})
