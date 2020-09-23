import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { updateQuestion } from '../actions'

class UpdateQuestionForm extends React.Component {

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
        <input {...formProps.input} type="file" className="inputBox custom-file-input" value={undefined} />
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  renderImgPreview = (value) => {
    return(
      <React.Fragment>
        <img
          src={URL.createObjectURL(value)}
          alt=""
          className="preview"
        />
      </React.Fragment>
    );
  }

  renderImgPlaceholder = () => {
    return(
      <div className="imgPlaceholderContainer">
        <div className="placeholderImgContainer">
          <div className="placeholderImg">
            <i className="fas fa-photo-video"></i>
          </div>
        </div>
        <div className="placeholderBackground">If you add an image or png file, a preview will be shown here</div>
      </div>
    );
  }

  renderPlaceholderOrImg = (file) => {
    if(this.props.currentQuestion.imgUrl === null){
      if(file === undefined || file.length < 1){
        return this.renderImgPlaceholder()
      } else {
        return this.renderImgPreview(file[0])
      }
    }
  }

  onSubmit = ({ number, description, file }) => {
    const { userData, currentQuestion, updateQuestion } = this.props;
    let formData = new FormData()
    formData.append('id', currentQuestion.id)
    formData.append('questionNumber', number)
    formData.append('description', description)
    if(file !== undefined){
      formData.append('file', file[0])
    }
    updateQuestion(formData, userData.jwt);
  }

  render(){
    const { questionNumber, imgUrl } = this.props.currentQuestion
    return(
      <div className="">
        <div id="questionViewTitle" className="title-large">{`Edit Question ${questionNumber}`}</div>
        <div className={imgUrl === null ? "questionFormArea" : ''}>
          <div className={imgUrl === null ? "questionForm" : ''}>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
              <Field name="number" component={this.renderInput} label="Question Number:"/>
              <Field name="description" component={this.renderTextArea} label="Question description:"/>
              {imgUrl === null ? <Field name="file" component={this.renderFileInput} label="Add an image or gif:" /> : null}
              <div className="buttonGroup">
                <button className="submit"><i className="far fa-save"></i> Save Changes</button>
                <button
                  data-testid="delete-question-button"
                  onClick={this.props.triggerModal}
                  className="delete"
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </form>
          </div>
          <div className={imgUrl === null ? "questionImageArea" : ''}>
            {this.renderPlaceholderOrImg(this.props.file)}
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { number, description } = formValues
  const errors = {}

  if(!number){
    errors.number = "The question number must not be empty"
  } else if(isNaN(number) || number === ""){
    errors.number = "Only numbers are valid for the question number"
  }

  if(!description){
    errors.description = "The question description must not be left empty"
  }

  return errors
}

const selector = formValueSelector('updateQuestionForm');

const mapStateToProps = (state) => {
  return {
    initialValues: {
      number: state.currentQuestion.questionNumber,
      description: state.currentQuestion.description
    },
    userData: state.userData,
    currentQuestion: state.currentQuestion,
    file: selector(state, 'file')
  }
}

export default connect(mapStateToProps,
  { updateQuestion
  })(reduxForm({ form: 'updateQuestionForm', validate: validate, enableReinitialize: true })(UpdateQuestionForm))
