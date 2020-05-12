import React from 'react'
import  { Field, reduxForm } from 'redux-form'

class QuizSearchByName extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        <label>{formProps.label}</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    );
  }
  // endpoint, data, token, setNotification, errorMsg
  onSubmit = ({ name }) => {
    const { jwt, permission, getQuizSearchResults } = this.props;
    const param = {name: name}
    const errorMsg = `No match found for: ${name}`
    getQuizSearchResults("quiz/findByName", param, jwt, permission, errorMsg);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="name" component={this.renderInput} label="Quiz name:"/>
          <button className="submit"><i className="fas fa-search"></i> Search</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "quizName" })(QuizSearchByName)
