import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addQuestion } from '../actions'
import { setNotification } from '../../notifications/actions'
import Loading from '../../components/loading'
import history from '../../history'

class NewQuestionForm extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')
      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    document.documentElement.scrollTop = 0;
  }

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    );
  }

  renderTextArea = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <textarea {...formProps.input} className="inputBox"/>
      </div>
    );
  }

  renderFileInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        {this.renderImgPreview(formProps.input.value[0])}
        <input {...formProps.input} type="file" className="inputBox custom-file-input" value={undefined} />
      </div>
    );
  }

  renderImgPreview = (value) => {
    return value ? <div className="imgPreview"><img src={URL.createObjectURL(value)} alt="" className="preview" /></div> : null
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  onSubmit = ({ number, description, file }) => {
    const { userData, quiz, addQuestion } = this.props;
    let formData = new FormData()
    formData.append('quizId', quiz.id)
    formData.append('questionNumber', number)
    formData.append('description', description)
    if(file !== undefined){
      formData.append('file', file[0])
    }
    addQuestion(formData, userData.jwt)
  }

  render(){
    return(
      <div className="componentContainer">
        <Loading loaderState={this.props.globals.loaderState}/>
        <div className="title-large-spaced">Create a Question</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-centered">
          <Field name="number" component={this.renderInput} label="Question Number:"/>
          <Field name="description" component={this.renderTextArea} label="Question description:"/>
          <Field name="file" component={this.renderFileInput} label="Add an image or gif:" />
          <div className="buttonGroup">
            <button className="submit">Save</button><Link to="/editQuiz" className="cancel">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { number, description } = formValues
  const errors = {}
  const regex = /^\d+$/g

  if(!number){
    errors.number = "The question number must not be empty"
  } else if (!number.match(regex)){
    errors.number = "Only numbers are valid for the question number"
  }

  if(!description){
    errors.description = "The question description must not be left empty"
  }

  return errors

}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    currentQuestion: state.currentQuestion,
    quiz: state.quiz,
    globals: state.globals
  }
}

export default connect(mapStateToProps,
  { addQuestion,
    setNotification
  })(reduxForm({ form: 'newQuestionForm', validate: validate })(NewQuestionForm))
