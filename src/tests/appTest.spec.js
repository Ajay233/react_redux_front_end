import React from 'react'
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from '../App.js'
import NavBar from '../navBar/navBar.js'
import Home from '../home';
import Login from '../authentication/login';
import SignUp from '../authentication/signUp';
import Verify from '../authentication/verify';
import UserList from '../userList/userList'
import ManageAccount from '../manageAccount/manageAccount'
import EditUserPrivilege from '../editUserPrivilege/editUserPrivilege'
import QuizSearch from '../quizSearch/quizSearch'
import NewQuizForm from '../quiz/forms/newQuiz'
import QuizView from '../quiz/quizView'
import QuestionView from '../question/questionView'
import NewQuestionForm from '../question/forms/newQuestion'
import AnswerView from '../answer/viewAnswer'
import AllQuizes from '../quizSearch/allQuizes'
import QuizStart from '../quizStart/quizStart'
import { shallow, mount } from 'enzyme'
import { setNotification } from '../notifications/actions'

import configureStore from 'redux-mock-store'
import history from '../history'

const mockStore = configureStore({})

jest.mock('../authentication/verify');
jest.mock('../userList/userList')
jest.mock('../manageAccount/manageAccount')
jest.mock('../editUserPrivilege/editUserPrivilege')
jest.mock('../quizSearch/quizSearch')
jest.mock('../quiz/forms/newQuiz')
jest.mock('../quiz/quizView')
jest.mock('../question/questionView')
jest.mock('../question/forms/newQuestion')
jest.mock('../answer/viewAnswer')
jest.mock('../quizSearch/allQuizes')
jest.mock('../quizStart/quizStart')

describe("App", () => {

  let store;

  beforeEach(() => {
    store = mockStore({
      userData: {id:1, forename: "test", surname: "test", email: "", jwt: "jwt"},
      navBarState: { showDropDown: false },
      verificationProcess: {completionStatus: "test", token: "", error: {}},
      notificationData: { message: "", type: "", show: false, timed: true },
      userResults: {},
      listOfUsers: [],
      quizProgressTracking: { questionNumber: 0, answersPicked:[], showResults: false },
      quizes: [],
      quiz: { id: "", name: "", description: "", category: "", status: "" },
      questions: [],
      currentQuestion: {id: 1, questionNumber: 1, description: ""},
      answers: [],
      currentAnswer: { id: 1, answerIndex: 1, description: "", correctAnswer: true },
      showModal: { showModal: false, showModal2: false, showModal3: false },
      lists: { categories: ["", "", "", ""] },
      globals: {
        enableDarkMode: true
      }
    })
  })

  it("should render the Home component if the path is '/'", () => {

    history.push("/")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(Home)).toHaveLength(1)
  })

  it("should render the Login component if the path is '/login'", () => {

    history.push("/login")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(Login)).toHaveLength(1)
  })

  it("should render the SignUp component if the path is '/signUp'", () => {

    history.push("/signUp")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(SignUp)).toHaveLength(1)
  })

  it("should render the Verify component if the path is '/verify'", () => {

    history.push("/verify")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(Verify)).toHaveLength(1)
  })

  it("should render the UserList component if the path is '/userList'", () => {

    history.push("/userList")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(UserList)).toHaveLength(1)
  })

  it("should render the ManageAccount component if the path is '/manageAccount'", () => {

    history.push("/manageAccount")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(ManageAccount)).toHaveLength(1)
  })

  it("should render the EditUserPrivilege component if the path is '/editUserPrivilege'", () => {

    history.push("/editUserPrivilege")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(EditUserPrivilege)).toHaveLength(1)
  })

  it("should render the AllQuizes component if the path is '/allQuizes'", () => {

    history.push("/allQuizes")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(AllQuizes)).toHaveLength(1)
  })

  it("should render the QuizSearch component if the path is '/quizSearch'", () => {

    history.push("/quizSearch")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(QuizSearch)).toHaveLength(1)
  })

  it("should render the QuizView component if the path is '/viewQuiz'", () => {

    history.push("/viewQuiz")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(QuizView)).toHaveLength(1)
  })

  it("should render the QuizView component if the path is '/editQuiz'", () => {

    history.push("/editQuiz")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(QuizView)).toHaveLength(1)
  })

  it("should render the NewQuizForm component if the path is '/newQuiz'", () => {

    history.push("/newQuiz")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(NewQuizForm)).toHaveLength(1)
  })

  it("should render the QuestionView component if the path is '/viewQuestion'", () => {

    history.push("/viewQuestion")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(QuestionView)).toHaveLength(1)
  })

  it("should render the QuestionView component if the path is '/editQuestion'", () => {

    history.push("/editQuestion")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(QuestionView)).toHaveLength(1)
  })

  it("should render the NewQuestionForm component if the path is '/newQuestion'", () => {

    history.push("/newQuestion")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(NewQuestionForm)).toHaveLength(1)
  })

  it("should render the AnswerView component if the path is '/newAnswer'", () => {

    history.push("/newAnswer")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(AnswerView)).toHaveLength(1)
  })

  it("should render the AnswerView component if the path is '/editAnswer'", () => {

    history.push("/editAnswer")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(AnswerView)).toHaveLength(1)
  })

  it("should render the QuizStart component if the path is '/startQuiz'", () => {

    history.push("/startQuiz")

    const wrapper = mount(
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    )

    expect(wrapper.find(NavBar)).toHaveLength(1)
    expect(wrapper.find(QuizStart)).toHaveLength(1)
  })
})
