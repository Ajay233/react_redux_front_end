import React from 'react';
import { Router, Route } from 'react-router-dom';
import NavBar from './navBar.js'
import Home from './home';
import Login from './authentication/login';
import SignUp from './authentication/signUp';
import Verify from './authentication/verify';
import UserList from './userList/userList'
import ManageAccount from './manageAccount/manageAccount'
import EditUserPrivilege from './editUserPrivilege/editUserPrivilege'
import QuizSearch from './quizSearch/quizSearch'
import NewQuizForm from './forms/newQuiz'
import Quiz from './quiz/quiz'
import QuestionView from './question/questionView'
import NewQuestionForm from './forms/newQuestion'
import AnswerView from './answer/viewAnswer'
import AllQuizes from './quiz/allQuizes'
import QuizStart from './quizStart/quizStart'
import history from './history'
import './stylesheets/main.css'
import './stylesheets/buttons.css'
import './stylesheets/inputs.css'
// import '../public/fontawesome/css/all.css'

class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <Router history={history}>
          <React.Fragment>
            <NavBar />
            <Route path="/" exact render={() => <Home />}/>
            <Route path="/login" render={() => <Login verify={false} />}/>
            <Route path="/signUp" render={() => <SignUp />}/>
            <Route path="/verify" render={() => <Verify />}/>
            <Route path="/userList" component={() => <UserList/>} />
            <Route path="/manageAccount" component={()=> <ManageAccount />}/>
            <Route path="/editUserPrivilege" component={()=> <EditUserPrivilege />}/>
            <Route path="/allQuizes" component={()=> <AllQuizes />} />
            <Route path="/quizSearch" component={()=> <QuizSearch />}/>
            <Route path={["/viewQuiz", "/editQuiz"]} component={()=> <Quiz />}/>
            <Route path="/newQuiz" component={()=> <NewQuizForm />}/>
            <Route path={["/viewQuestion", "/editQuestion"]} component={()=> <QuestionView />}/>
            <Route path="/newQuestion" component={()=> <NewQuestionForm />}/>
            <Route path={["/editAnswer", "/newAnswer"]} component={()=> <AnswerView />} />
            <Route path="/startQuiz" component={()=>< QuizStart/>} />
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
