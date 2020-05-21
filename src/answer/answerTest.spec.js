import React from 'react'
import { Router } from 'react-router-dom'
import { Answer } from './answer'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { setCurrentAnswer, deleteAnswer } from './actions'
import { setNotification } from '../notifications/actions'
import { showModal } from '../modal/actions'
import history from '../history'


jest.mock("./actions")
jest.mock("../notifications/actions")
jest.mock("../modal/actions")

describe("Answer", () => {

  let answer;

  beforeEach(() => {
    answer = {
      id: 1,
      answerNumber: 1,
      description: "testDescription",
      correctAnswer: false
    }
  })

  it("should match snapshot for user with 'READ-ONLY' permission", () => {

    const userData = {
      permission: "READ-ONLY",
      jwt: "jwt"
    }

    const component = renderer.create(
      <Answer
        answer={answer}
        userData={userData}
      />
    )

    expect(component).toMatchSnapshot()
  })


  it("should match snapshot for user with 'ADMIN' permission", () => {

    const userData = {
      permission: "ADMIN",
      jwt: "jwt"
    }

    const component = renderer.create(
      <Router history={history}>
        <Answer
          answer={answer}
          userData={userData}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })

  it("should match snapshot which renders a correct answer", () => {

    const correctAnswer = {
      id: 1,
      answerNumber: 1,
      description: "testDescription",
      correctAnswer: true
    }

    const userData = {
      permission: "ADMIN",
      jwt: "jwt"
    }

    const component = renderer.create(
      <Router history={history}>
        <Answer
          answer={correctAnswer}
          userData={userData}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })
})

describe("handleEdit", () => {

  let answer;

  beforeEach(() => {
    answer = {
      id: 1,
      answerNumber: 1,
      description: "testDescription",
      correct: false
    }
  })

  it("should call setCurrentAnswer", () => {

    const userData = {
      permission: "USER",
      jwt: "jwt"
    }

    const wrapper = mount(
      <Answer
        answer={answer}
        userData={userData}
        setCurrentAnswer={setCurrentAnswer}
      />
    )

    wrapper.instance().handleEdit()
    expect(setCurrentAnswer).toHaveBeenCalledTimes(1)
  })
})

describe("handleDelete", () => {

  let answer;

  beforeEach(() => {
    answer = {
      id: 1,
      answerNumber: 1,
      description: "testDescription",
      correct: false
    }
  })

  it("should call showModal and setCurrentAnswer", () => {

    setCurrentAnswer.mockClear()

    const userData = {
      permission: "USER",
      jwt: "jwt"
    }

    const wrapper = mount(
      <Answer
        answer={answer}
        userData={userData}
        setCurrentAnswer={setCurrentAnswer}
        showModal={showModal}
      />
    )

    wrapper.instance().handleDelete()
    expect(setCurrentAnswer).toHaveBeenCalledTimes(1)
    expect(showModal).toHaveBeenCalledTimes(1)

  })
})
