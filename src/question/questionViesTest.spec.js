import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QuestionView } from './questionView'
import { mapStateToProps } from './questionView'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import history from '../history'

const mockStore = configureStore({})

// jest.mock("../modal/modal")

describe("mapStateToProps", () => {
  it("should map the state to props", () => {
    const appState = {
      userData: { id: 1, jwt: "jwt"},
      quiz: { id: 1, name: "test"},
      currentQuestion: { id: 1, questionNumber: 1},
      answers: [{id: 1, answerNumber: 1}, {id: 2, answerNumber: 2}],
      currentAnswer: {id: 1, answerNumber: 1},
      modalState: { showModal: false }
    }

    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("QuestionView", () => {

  let store;
  const userData={ id: 1, jwt: "jwt"}
  const showModal={ showModal: false, showModal2: false, showModal3: false }
  const currentAnswer={id: 1, answerNumber: 1}
  const currentQuestion={ id: 1, questionNumber: 1}
  const quiz={ id: 1, name: "test"}
  const answers=[{id: 1, answerNumber: 1}, {id: 2, answerNumber: 2}]
  const notificationData={message: "test", type: "success", show: false, timed: true}

  beforeEach(() => {
    store = mockStore({
      notificationData: notificationData
    })
  })

  afterEach(() => {
    // ReactDOM.createPortal.mockClear()
  })

  it("should ", () => {

    // ReactDOM.createPortal = jest.fn((element, node) => {
    //     return element
    // })

    // const wrapper = mount(
    //   <Provider store={store}>
    //     <Router history={history}>
    //       <QuestionView
    //         userData={userData}
    //         showModal={showModal}
    //         currentAnswer={currentAnswer}
    //         currentQuestion={currentQuestion}
    //         quiz={quiz}
    //         answers={answers}
    //       />
    //     </Router>
    //   </Provider>
    // )

    // wrapper.instance().renderAnswers()

    // console.log(wrapper.debug())
  })
})
