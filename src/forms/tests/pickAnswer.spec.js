import React from 'react'
import { Provider } from 'react-redux'
import PickAnswer from '../pickAnswer'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import mockAxios from 'jest-mock-axios'
import history from '../../history'

const mockStore = configureStore({})

jest.mock('../../history')

describe("pickAnswer form", () => {

  let store;
  let answers;
  let onSubmit;
  let exitQuiz;

  beforeEach(() => {
    store = mockStore({
      answers
    })

    answers = [{ id: 1, description: "test" }, { id: 2, description: "test2" }]
    onSubmit = jest.fn()
    exitQuiz = jest.fn()
  })

  it("should call the passed in submit method when the for is submitted", () => {
    const wrapper = mount(
      <Provider store={store}>
        <PickAnswer
          title={"Answers"}
          answers={answers}
          onSubmit={onSubmit}
          numberOfQuestions={2}
          currentQuestionNumber={1}
          showResults={false}
          exit={exitQuiz}
        />
      </Provider>
    )

    wrapper.find('form').simulate('submit')
    expect(onSubmit).toHaveBeenCalledTimes(1)
    // expect(reset).toHaveBeenCalledTimes(1)
  })

  it("should call the passed in quit method when the quit button is clicked", () => {
    const wrapper = mount(
      <Provider store={store}>
        <PickAnswer
          title={"Answers"}
          answers={answers}
          onSubmit={onSubmit}
          numberOfQuestions={2}
          currentQuestionNumber={1}
          showResults={false}
          exit={exitQuiz}
        />
      </Provider>
    )

    wrapper.find('button').at(1).simulate('click')
    expect(history.push).toHaveBeenCalledTimes(1)
    expect(exitQuiz).toHaveBeenCalledTimes(1)
  })

  it("should match the snapshot, button title should be: 'Next Question'", () => {
    const component = renderer.create(
      <Provider store={store}>
        <PickAnswer
          title={"Answers"}
          answers={answers}
          onSubmit={onSubmit}
          numberOfQuestions={2}
          currentQuestionNumber={1}
          showResults={false}
          exit={exitQuiz}
        />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should match the snapshot, button title should be: 'Finish'", () => {
    const component = renderer.create(
      <Provider store={store}>
        <PickAnswer
          title={"Answers"}
          answers={answers}
          onSubmit={onSubmit}
          numberOfQuestions={2}
          currentQuestionNumber={2}
          showResults={false}
          exit={exitQuiz}
        />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
