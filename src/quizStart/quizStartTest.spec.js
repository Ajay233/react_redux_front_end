import React from 'react'
import ReactDOM from 'react-dom'
import { QuizStart, mapStateToProps } from './quizStart'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import mockAxios from 'jest-mock-axios'
import { render, fireEvent, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import history from '../history'

import { addAnswer, incrementQuestion, showResults, exitQuiz, clearQuizProgress } from './actions'
import { setCurrentQuestion } from '../question/actions'
import { getAnswers } from '../answer/actions'
import { setNotification } from '../notifications/actions'

jest.mock("./actions")
jest.mock("../question/actions")
jest.mock("../answer/actions")
jest.mock("../notifications/actions")

const mockStore = configureStore({})

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: { id: 1, loggedIn: true },
      quiz: { id: 1, name: "test", description: "test" },
      questions: [
        { id: 1, questionNumber: 1, description: "test" },
        { id: 2, questionNumber: 2, description: "test2" }
      ],
      currentQuestion: { id: 1, questionNumber: 1, description: "test" },
      answers: [
        { id: 1, answerIndex: 1, description: "test" },
        { id: 2, answerIndex: 2, description: "test2" }
      ],
      quizProgressTracking: { questionNumber: 0, answersPicked:[], showResults: false }
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("", () => {

  let store;
  let userData;
  let quiz;
  let questions;
  let currentQuestion;
  let answers;
  let quizProgressTracking;

  beforeEach(() => {
    store = mockStore({})

    userData = { id: 1, jwt: "jwt", loggedIn: true }
    quiz = { id: 1, name: "test", description: "test" }
    questions = [
      { id: 1, questionNumber: 1, description: "test" },
      { id: 2, questionNumber: 2, description: "test2" }
    ],
    currentQuestion = { id: 1, questionNumber: 1, description: "test" }
    answers = [
      { id: 1, answerIndex: 1, description: "test" },
      { id: 2, answerIndex: 2, description: "test2" }
    ],
    quizProgressTracking = { questionNumber: 0, answersPicked:[], showResults: false }

    window.scrollTo = jest.fn()
  })

  afterEach(() => {
    addAnswer.mockClear()
    incrementQuestion.mockClear()
  })

  it("should render a question, list of answers to pick, 'next question' and 'quit' buttons", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuizStart
            userData={userData}
            quizProgressTracking={quizProgressTracking}
            questions={questions}
            quiz={quiz}
            currentQuestion={currentQuestion}
            answers={answers}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot()
  })

  it("should render the results", () => {
    const finishedQuiz = {
      questionNumber: 2,
      answersPicked:[
        { id: 1, answerIndex: 1, description: "test", correctAnswer: true },
        { id: 2, answerIndex: 2, description: "test2", correctAnswer: false }
      ],
      showResults: true
    }

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <QuizStart
            userData={userData}
            quizProgressTracking={finishedQuiz}
            questions={questions}
            quiz={quiz}
            currentQuestion={currentQuestion}
            answers={answers}
            setNotification={setNotification}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot()
  })

  describe("nextQuestion", () => {
    it("should call", () => {
      const pickedAns = { id: 1, answerIndex: 1, description: "test" }
      const body = { questionId: 2 }
      const component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuizStart
              userData={userData}
              quizProgressTracking={quizProgressTracking}
              questions={questions}
              quiz={quiz}
              currentQuestion={currentQuestion}
              answers={answers}
              addAnswer={addAnswer}
              incrementQuestion={incrementQuestion}
              setCurrentQuestion={setCurrentQuestion}
              getAnswers={getAnswers}
              answer={pickedAns}
              clearQuizProgress={clearQuizProgress}
              setNotification={setNotification}
            />
          </Router>
        </Provider>
      );
      fireEvent.click(component.getByTestId("next-button"))
      expect(addAnswer).toHaveBeenCalledTimes(1)
      // expect(addAnswer).toHaveBeenCalledwith(pickedAns)
      expect(incrementQuestion).toHaveBeenCalledTimes(1)
      expect(incrementQuestion).toHaveBeenCalledWith(1)
      expect(setCurrentQuestion).toHaveBeenCalledTimes(1)
      expect(setCurrentQuestion).toHaveBeenCalledWith(questions[1])
      expect(getAnswers).toHaveBeenCalledTimes(1)
      expect(getAnswers).toHaveBeenCalledWith(body,"jwt")

    })
  })

  describe("addLastAnswer", () => {
    it("should call", () => {
      const lastQuestion = { id: 2, questionNumber: 2, description: "test2" }
      const quizProgressTracking = { questionNumber: 1, answersPicked:[], showResults: false }
      const component = render(
        <Provider store={store}>
          <Router history={history}>
            <QuizStart
              quizProgressTracking={quizProgressTracking}
              questions={questions}
              quiz={quiz}
              currentQuestion={lastQuestion}
              answers={answers}
              addAnswer={addAnswer}
              incrementQuestion={incrementQuestion}
              setCurrentQuestion={setCurrentQuestion}
              getAnswers={getAnswers}
              userData={userData}
              showResults={showResults}
              clearQuizProgress={clearQuizProgress}
              setNotification={setNotification}
            />
          </Router>
        </Provider>
      );
      console.log(questions.length)
      fireEvent.click(component.getByTestId("next-button"))
      expect(addAnswer).toHaveBeenCalledTimes(1)
      // // expect(addAnswer).toHaveBeenCalledwith()
      expect(incrementQuestion).toHaveBeenCalledTimes(1)
      // // expect(incrementQuestion).toHaveBeenCalledWith(2)
      expect(showResults).toHaveBeenCalledTimes(1)

    })
  })

})
