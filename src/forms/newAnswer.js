import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import history from '../history'

import { sessionExpired } from '../utils/session'
import { post } from '../axiosRequests/requests'

import { setNotification } from '../notifications/actions'
import { addAnswer } from '../answer/actions'

class NewAnswerForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    );
  }

  renderSelect = (formProps) => {
    return(
      <div>
        <label>{ formProps.label }</label>
        <select {...formProps.input} className="inputBox">
          {formProps.children}
        </select>
      </div>
    );
  }

  onSubmit = ({ number, description, correct }) => {
    const { currentQuestion, userData, setNotification, addAnswer } = this.props
    const data = {
      questionId: currentQuestion.id,
      answerNumber: number,
      description: description,
      correctAnswer: correct
    }
    post("answer/create", [data], userData.jwt).then((response) => {
      addAnswer(response.data[0])
      history.push("/editQuestion");
      setNotification("Answer created", "success", true);
    }).catch((error) => {
      if(error.response.status === 403){
        sessionExpired(this.props.dispatch);
      } else {
        console.log(error.response);
        setNotification("Error - unable to update answer", "error", true);
      }
    });
  }

  render(){
    return(
      <div className="componentContainer">
        <div className="title-large">Create an Answer</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="number" component={this.renderInput} label="Answer number:"/>
          <Field name="description" component={this.renderInput} label="Answer description"/>
          <Field name="correct" component={this.renderSelect} label="Correct? Yes/No:">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Field>
          <button className="submit">Save</button><Link to="/editQuestion" className="cancel">Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: {
      correct: true
    },
    userData: state.userData,
    currentQuestion: state.currentQuestion
  }
}

export default connect(mapStateToProps, { setNotification, addAnswer })(reduxForm({ form: 'updateAnswer' })(NewAnswerForm))
