import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Notification from '../notifications/notifications'

import { addQuiz } from '../quizSearch/actions'
import { setQuiz } from '../quiz/actions'
import { clearQuestions } from '../question/actions'
import { setNotification } from '../notifications/actions'

import { post } from '../axiosRequests/requests'
import { sessionExpired } from '../utils/session'
import history from '../history'

class NewQuizForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
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
        <select {...formProps.input} className="inputBox">
          {formProps.children}
        </select>
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
    const { userData, setNotification, addQuiz, setQuiz, clearQuestions, dispatch } = this.props;
    const body = {
      name: name,
      description: description,
      category: category,
      status: "DRAFT"
    }
    post("quiz/create", body, userData.jwt).then((response) => {
      setQuiz(response.data);
      addQuiz(response.data);
      clearQuestions();
      setNotification("Quiz created, but what's a quiz without questions? Add your questions below.", "success", true);
      history.push("/editQuiz");
    }).catch((error) => {
      console.log(error.response);
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else {
        setNotification("Error - Unable to create quiz", "error", true);
      }
    })
  }

  render(){
    return(
      <div className="componentContainer">
        <Notification />
        <div className="title-large">Create a Quiz</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="name" component={this.renderInput} label="Quiz name:"/>
          <Field name="description" component={this.renderInput} label="Quiz description:"/>
          <Field name="category" component={this.renderSelect} label="Quiz category:">
            <option value="" disabled>Select a category</option>
            {this.renderOptions()}
          </Field>
          <div>
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

// The warning is being caused by:
//                                     initialValues: {
//                                       category: "Comics"
//                                     }

// Setting the default value of a select does not work, for redux-form, the initialValues object has to be set somehow

// Possible alternative from redux-form docs (doesn't throw any new warning/error but the old warning persists)
// NewQuizForm = reduxForm({ form: 'quizForm' })(NewQuizForm)
// NewQuizForm = connect( state => ({ initialValues: { category: "Comics" }, userData: state.userData }),{ setNotification, addQuiz })(NewQuizForm)
//
// export default NewQuizForm

export default connect(mapStateToProps,
  {
    setNotification,
    addQuiz,
    setQuiz,
    clearQuestions
  })(reduxForm({ form: 'newQuizForm', validate: validate })(NewQuizForm))
