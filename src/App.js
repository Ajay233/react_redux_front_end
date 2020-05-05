import React from 'react';
import { Router, Route } from 'react-router-dom';
import NavBar from './navBar.js'
import Home from './home';
import Login from './authentication/login';
import SignUp from './authentication/signUp';
import Verify from './authentication/verify';
import Logout from './authentication/logout';
import UserList from './userList/userList'
import ManageAccount from './manageAccount/manageAccount'
import EditUserPrivilege from './editUserPrivilege/editUserPrivilege'
import QuizSearch from './quizSearch/quizSearch'
import Quiz from './quiz/quiz'
import QuestionView from './question/questionView'
import AnswerView from './answer/viewAnswer'
import history from './history'
import './stylesheets/main.css'
import './stylesheets/buttons.css'
import './stylesheets/inputs.css'
import './fontawesome/css/all.css'

class App extends React.Component {
  render(){
    return (
      <div className="container">
        <Router history={history}>
          <div className="container">
            <NavBar />
            <Route path="/" exact render={() => <Home />}/>
            <Route path="/login" render={() => <Login verify={false} />}/>
            <Route path="/signUp" render={() => <SignUp />}/>
            <Route path="/verify" render={() => <Verify />}/>
            <Route path="/logout" component={Logout} />
            <Route path="/userList" component={() => <UserList/>} />
            <Route path="/manageAccount" component={()=> <ManageAccount />}/>
            <Route path="/editUserPrivilege" component={()=> <EditUserPrivilege />}/>
            <Route path="/quizSearch" component={()=> <QuizSearch />}/>
            <Route path={["/viewQuiz", "/editQuiz", "/newQuiz"]} component={()=> <Quiz />}/>
            <Route path={["/viewQuestion", "/editQuestion", "newQuestion"]} component={()=> <QuestionView />}/>
            <Route path={["/editAnswer", "newAnswer"]} component={()=> <AnswerView />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
