import React from 'react'
import  { Field, reduxForm } from 'redux-form'

class QuizSearchByName extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{formProps.label}</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
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

const validate = (formValues) => {
  const { name } = formValues
  const errors = {}
  if(!name){
    errors.name = "A name must be entered to conduct a search by quiz name"
  }
  return errors
}

export default reduxForm({ form: "quizName", validate: validate })(QuizSearchByName)
