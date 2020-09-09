import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Notification from '../../notifications/notifications'

import { createQuiz } from '../actions'

class NewQuizForm extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    )
  }

  renderTextArea = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <textarea {...formProps.input} className="inputBox"/>
      </div>
    )
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  renderSelect = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <div>
          <select {...formProps.input} className="inputBox select-medium">
            {formProps.children}
          </select>
        </div>
      </div>
    );
  }

  renderOptions = () => {
    const { categories } = this.props.lists;
    let optionsList = categories.map(category => {
      return <option key={categories.indexOf(category)} value={category}>{category}</option>
    })
    return optionsList;
  }

  onSubmit = ({ name, description, category }) => {
    const { userData, createQuiz } = this.props;
    const body = {
      name: name,
      description: description,
      category: category,
      status: "DRAFT"
    }
    createQuiz(body, userData.jwt);
  }

  render(){
    return(
      <div className="componentContainer">
        <Notification />
        <div className="title-large-spaced">Create a Quiz</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-centered">
          <Field name="name" component={this.renderInput} label="Quiz name:"/>
          <Field name="description" component={this.renderTextArea} label="Quiz description:"/>
          <Field name="category" component={this.renderSelect} label="Quiz category:">
            <option value="" disabled>Select a category</option>
            {this.renderOptions()}
          </Field>
          <div className="buttonGroup">
            <button className="submit">Save and continue</button><Link to="/quizSearch" className="cancel">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { name, description, category } = formValues
  const errors = {}

  if(!name){
    errors.name = "You must enter a quiz name"
  }

  if(!description){
    errors.description = "You must enter a quiz description"
  }

  if(!category){
    errors.category = "You must select a quiz category"
  }

  return errors
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    lists: state.lists
  }
}

export default connect(mapStateToProps, { createQuiz })(reduxForm({ form: 'newQuizForm', validate: validate })(NewQuizForm))
