import React from 'react'
import ReactDOM from 'react-dom'
import { QuizResult } from './quizResult'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { render, fireEvent, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import history from '../history'

import { setQuiz } from '../quiz/actions'
import { setNotification } from '../notifications/actions'
import { deleteQuiz, clearQuizes } from './actions'
import { showModal, showModal2 } from '../modal/actions'
import { getQuestions, setCurrentQuestion } from '../question/actions'
import { getAnswers } from '../answer/actions'

jest.mock("../quiz/actions")
jest.mock("../notifications/actions")
jest.mock("./actions")
jest.mock("../modal/actions")
jest.mock("../question/actions")
jest.mock("../answer/actions")

describe("QuizResult", () => {

  let store;
  let quiz;
  let userData;
  let modalState;
  beforeEach(() => {
    quiz = { id: 1, name: "test", description: "test", category: "test", status: "READY", imgUrl: "", author: "test", authorId: 2 }
  })

  afterEach(() => {
    showModal2.mockClear()
    showModal.mockClear()
    setQuiz.mockClear()
  })

  it("should render a quiz result and the appropriate options for a user with USER permission", () => {
    const component = renderer.create(
      <Router history={history}>
        <QuizResult
          quiz={quiz}
          permission={"USER"}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render a quiz result and the appropriate options for a user with READ-ONLY permission", () => {
    const component = renderer.create(
      <Router history={history}>
        <QuizResult
          quiz={quiz}
          permission={"READ-ONLY"}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render a quiz result and the appropriate options for a user with ADMIN permission", () => {
    const component = renderer.create(
      <Router history={history}>
        <QuizResult
          quiz={quiz}
          permission={"ADMIN"}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render a quiz result and the appropriate options for a user with SUPER-USER permission", () => {
    const component = renderer.create(
      <Router history={history}>
        <QuizResult
          quiz={quiz}
          permission={"SUPER-USER"}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render a quiz result and the appropriate options for a user with ADMIN permission who is the quiz author", () => {
    const userDataProp = { id: 2, permission: "ADMIN", jwt: "jwt" }
    const component = renderer.create(
      <Router history={history}>
        <QuizResult
          quiz={quiz}
          permission={"ADMIN"}
          userData={userDataProp}
        />
      </Router>
    )

    expect(component).toMatchSnapshot()
  })

  describe("handleStart", () => {

    it("should call", () => {
      const component = render(
        <Router history={history}>
          <QuizResult
            quiz={quiz}
            permission={"USER"}
            setQuiz={setQuiz}
            showModal2={showModal2}
          />
        </Router>
      )

      fireEvent.click(component.getByText("Start"))
      expect(setQuiz).toHaveBeenCalledTimes(1)
      expect(setQuiz).toHaveBeenCalledWith(quiz)
      expect(showModal2).toHaveBeenCalledTimes(1)
    })
  })

  describe("handleView", () => {
    it("should call", () => {
      const userDataProp = { id: 1, permission: "READ-ONLY", jwt: "jwt" }

      const component = render(
        <Router history={history}>
          <QuizResult
            quiz={quiz}
            permission={"READ-ONLY"}
            setQuiz={setQuiz}
            getQuestions={getQuestions}
            userData={userDataProp}
            setNotification={setNotification}
            clearQuizes={clearQuizes}
            jwt="jwt"
          />
        </Router>
      )

      const param = { quizId: 1 }

      fireEvent.click(component.getByText("View"))
      expect(getQuestions).toHaveBeenCalledTimes(1)
      expect(getQuestions).toHaveBeenCalledWith("question/findByQuizId", param, "jwt")
      expect(setQuiz).toHaveBeenCalledTimes(1)
      expect(setQuiz).toHaveBeenCalledWith(quiz)
    })
  })

  describe("handleDelete", () => {
    it("should call", () => {
      const component = render(
        <Router history={history}>
          <QuizResult
            quiz={quiz}
            permission={"SUPER-USER"}
            setQuiz={setQuiz}
            showModal={showModal}
          />
        </Router>
      )

      fireEvent.click(component.getByText("Delete"))
      expect(setQuiz).toHaveBeenCalledTimes(1)
      expect(setQuiz).toHaveBeenCalledWith(quiz)
      expect(showModal).toHaveBeenCalledTimes(1)
    })
  })

})
