import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { updateQuiz } from '../actions'

class UpdateQuizForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <input {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)} className="inputBox"/>
      </div>
    )
  }

  renderTextArea = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <textarea {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)} className="inputBox"/>
      </div>
    )
  }

  renderSelect = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{ formProps.label }</label>
        <div>
          <select {...formProps.input} placeholder={this.renderPlaceholder(formProps.input.name)} className="inputBox select-medium">
            {formProps.children}
          </select>
        </div>
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
        <div className="placeholderBackground">If you add an image or gif file, a preview will be shown here</div>
      </div>
    );
  }

  renderPlaceholderOrImg = (file) => {
    if(this.props.quiz.imgUrl === null){
      if(file === undefined || file.length < 1){
        return this.renderImgPlaceholder()
      } else {
        return this.renderImgPreview(file[0])
      }
    }
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  renderPlaceholder = (inputName) => {
    const {name, description, category} = this.props.quiz
    switch(inputName){
      case 'name': return name;
      case 'description': return description;
      case 'category': return category;
      default: return null;
    }
  }

  renderOptions = () => {
    const { categories } = this.props.lists
    let listOfOptions = categories.map(category => {
      return <option key={categories.indexOf(category)} value={category}>{category}</option>
    })
    return listOfOptions
  }

  onSubmit = ({ name, description, category, author, file }) => {
    const { userData, quiz, updateQuiz } = this.props;
    const quizAuthor = !author ? 'Anonymous' : author
    let formData = new FormData()
    formData.append('id', quiz.id)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('author', quizAuthor)
    if(file !== undefined){
      formData.append('file', file[0])
    }
    // const body = {
    //   id: quiz.id,
    //   name: name,
    //   description: description,
    //   category: category,
    //   status: quiz.status
    // }
    updateQuiz(formData, userData.jwt)
  }

  renderStatusButton = () => {
    const { quiz } = this.props;
    return(
      <button
        data-testid="updateStatus-button"
        className={quiz.status === "DRAFT" ? "save" : "warningButton"}
        onClick={this.props.updateStatus}
      >
        { quiz.status === "DRAFT" ? <i className="far fa-check-circle"></i> : <i className="fas fa-pencil-ruler"></i>}
        { quiz.status === "DRAFT" ? " Mark as Ready" : " Revert to draft" }
      </button>
    );
  }

  // <option value="" disabled>{this.props.quiz.category}</option>

  render(){
    const { imgUrl } = this.props.quiz
    return(
      <div className={imgUrl === null ? "quizFormArea" : ''}>
        <div className={imgUrl === null ? "quizForm" : ''}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form">
            <Field name="name" component={this.renderInput} label="Quiz name:"/>
            <Field name="description" component={this.renderTextArea} label="Quiz description:"/>
            <Field name="category" component={this.renderSelect} label="Quiz category:">
              {this.renderOptions()}
            </Field>
            <Field name="author" component={this.renderInput} label="Created by:" />
            {imgUrl === null ? <Field name="file" component={this.renderFileInput} label="Add an image or gif:" /> : null}
            <div className="buttonGroup">
              <button className="submit"><i className="far fa-save"></i> Save Changes</button>
              <button
                data-testid="delete-quiz-button"
                onClick={this.props.triggerModal}
                className="delete"
              >
                <i className="fas fa-trash-alt"></i> Delete Quiz
              </button>
              {this.renderStatusButton()}
            </div>
          </form>
        </div>
        <div className={imgUrl === null ? "quizImageArea" : ''}>
          {this.renderPlaceholderOrImg(this.props.file)}
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { name, description, category } = formValues
  const errors = {}
   if(!name){
     errors.name = "Quiz name must not be empty"
   }

   if(!description){
     errors.description = "Quiz description must not be empty"
   }

   if(!category){
     errors.description = "Quiz category must be selected"
   }
   return errors
}

const selector = formValueSelector('editQuizForm');

const mapStateToProps = (state) => {
  return {
    initialValues: {
      name: state.quiz.name,
      description: state.quiz.description,
      category: state.quiz.category,
      author: state.quiz.author
    },
    userData: state.userData,
    quiz: state.quiz,
    lists: state.lists,
    file: selector(state, 'file')
  }
}

export default connect(mapStateToProps,
  { updateQuiz
  })(reduxForm({ form: 'editQuizForm', validate: validate, enableReinitialize: true, destroyOnUnmount: false })(UpdateQuizForm))
