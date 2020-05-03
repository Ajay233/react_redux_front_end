import React from 'react';
import { connect } from 'react-redux'
import UpdateAnswerForm from '../forms/updateAnswer'
import Notification from '../notifications/notifications'

class AnswerView extends React.Component {
  render(){
    return(
      <div>
        <div>
          <Notification />
        </div>
        <UpdateAnswerForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    currentAnswer: state.currentAnswer
  }
}

export default connect(mapStateToProps)(AnswerView)
