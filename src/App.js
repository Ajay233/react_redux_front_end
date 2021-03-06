import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import NavBar from './navBar/navBar.js'
import Home from './home';
import Login from './authentication/login';
import SignUp from './authentication/signUp';
import Verify from './authentication/verify';
import UserList from './userList/userList'
import ManageAccount from './manageAccount/manageAccount'
import EditUserPrivilege from './editUserPrivilege/editUserPrivilege'
import QuizSearch from './quizSearch/quizSearch'
import NewQuizForm from './quiz/forms/newQuiz'
import QuizView from './quiz/quizView'
import QuestionView from './question/questionView'
import NewQuestionForm from './question/forms/newQuestion'
import AnswerView from './answer/viewAnswer'
import AllQuizes from './quizSearch/allQuizes'
import QuizIntro from './quizStart/quizIntro'
import QuizStart from './quizStart/quizStart'
import Help from './help/help'
import PDFView from './pdf/pdfView'
import history from './history'
import './stylesheets/buttons.css'
import './stylesheets/inputs.css'
import './stylesheets/pdf.css'
import './stylesheets/loading.css'


class App extends React.Component {

  componentDidMount(){
    window.addEventListener("hashchange", function() { window.scrollBy(0, -60) });
  }

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
            <Route path={["/viewQuiz", "/editQuiz"]} component={()=> <QuizView />}/>
            <Route path="/newQuiz" component={()=> <NewQuizForm />}/>
            <Route path={["/viewQuestion", "/editQuestion"]} component={()=> <QuestionView />}/>
            <Route path="/newQuestion" component={()=> <NewQuestionForm />}/>
            <Route path={["/editAnswer", "/newAnswer"]} component={()=> <AnswerView />} />
            <Route path="/startQuizIntro" component={()=><QuizIntro />} />
            <Route path="/startQuiz" component={()=><QuizStart />} />
            <Route path="/help" component={()=><Help />} />
            <Route path="/viewPdf" component={()=><PDFView />} />
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    globals: state.globals
  }
}

export default connect(mapStateToProps)(App);
