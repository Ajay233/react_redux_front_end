import React from 'react';
import { connect } from 'react-redux'
import UpdateAnswerForm from '../forms/updateAnswer'
import NewAnswerForm from '../forms/newAnswer'
import Notification from '../notifications/notifications'
import history from '../history'

export class AnswerView extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  renderForm = () => {
    return history.location.pathname === "/newAnswer" ? <NewAnswerForm /> : <UpdateAnswerForm />;
  }

  render(){
    return(
      <div className="componentContainer">
        <div>
          <Notification />
        </div>
        {this.renderForm()}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    currentAnswer: state.currentAnswer
  }
}

export default connect(mapStateToProps)(AnswerView)
