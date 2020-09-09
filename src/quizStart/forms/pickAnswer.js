import React from 'react'
import { Field, reduxForm } from 'redux-form'
import history from '../../history'

const PickAnswer = (props) => {

  const renderInputWithError = (formProps) => {
    return(
      <div>
        {renderError(formProps.meta)}
        <label><input {...formProps.input} type={formProps.type} className="radioInput"/>{formProps.label}</label>
      </div>
    );
  }

  const renderInput = (formProps) => {
    return(
      <div>
        <label><input {...formProps.input} type={formProps.type} className="radioInput"/>{formProps.label}</label>
      </div>
    );
  }

  const renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null;
  }

  const mapFields = (answers) => {
    let listOfFields = answers.map(answer => {
      return <Field
                key={answers.indexOf(answer)}
                name="answer"
                component={ answers.indexOf(answer) === 0 ? renderInputWithError : renderInput }
                type="radio"
                value={answer.description}
                label={`${answer.description}`}
              />
    })
    return listOfFields
  }

  const renderButtonTitle = () => {
    return props.currentQuestionNumber <= props.numberOfQuestions ? "Quit" : "Exit quiz"
  }

  const disableButton = () => {
    return props.currentQuestionNumber <= props.numberOfQuestions ? false : true
  }

  const submitForm = ({ answer }) => {
    props.onSubmit({ answer });
    props.reset("pickedAnswer")
  }

  const handleClick = () => {
    history.push("/");
    props.exit();
  }

  return(
    <div id="pickAnswerForm">
      <form onSubmit={props.handleSubmit(submitForm)}>
        <div id="answerContainer">
        <div className="title-medium-left-alt">{props.title}</div>
        {mapFields(props.answers)}
        </div>
        <img src={require("../../public/icons/reply.png")} alt="" />
        <div className="buttonContainer">
          <button data-testid="next-button" className="submit quizButton-left" disabled={disableButton()}>Next Question</button>
          <button data-testid="quit-button" className="submit quizButton-right" onClick={handleClick}>{renderButtonTitle()}</button>
        </div>
      </form>
    </div>
  );
}

// needs to be updated to validate whether number of picked answers matches the
// number of correct answers in answers array
const validate = (formValues) => {
  console.log(formValues)
  const errors = {}

  if(!formValues.answer){
    errors.answer = "You must pick an answer before you can continue to the next question"
  }

  return errors
}

export default reduxForm({ form: 'pickedAnswer', validate: validate, enableReinitialize: true })(PickAnswer)
