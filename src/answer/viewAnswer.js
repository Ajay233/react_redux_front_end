import React from 'react';
import { connect } from 'react-redux'
import UpdateAnswerForm from './forms/updateAnswer'
import NewAnswerForm from './forms/newAnswer'
import Notification from '../notifications/notifications'
import Loading from '../components/loading'
import { setNotification } from '../notifications/actions'
import history from '../history'

export class AnswerView extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')
      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    document.documentElement.scrollTop = 0;
  }

  renderForm = () => {
    return history.location.pathname === "/newAnswer" ? <NewAnswerForm /> : <UpdateAnswerForm />;
  }

  render(){
    return(
      <React.Fragment>
        <Loading loaderState={this.props.globals.loaderState} />
        <div className="componentContainer">
          <div>
            <Notification />
          </div>
          {this.renderForm()}
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    currentAnswer: state.currentAnswer,
    globals: state.globals
  }
}

export default connect(mapStateToProps, { setNotification })(AnswerView)
