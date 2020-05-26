import React from 'react'
import { Field, reduxForm } from 'redux-form'
import history from '../history'

const PickAnswer = (props) => {

  const renderInput = (formProps) => {
    return(
      <div>
        {renderError(formProps.meta)}
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
                name="answer" component={renderInput}
                type="radio" value={answer.description}
                label={`${answer.description}`}
              />
    })
    return listOfFields
  }

  const renderButtonTitle = () => {
    return props.currentQuestionNumber < props.numberOfQuestions ? "Next Question" : "Finish"
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
    <div>
      <form onSubmit={props.handleSubmit(submitForm)}>
        {props.title}
        {mapFields(props.answers)}
        <button data-testid="next-button" className="submit" >{renderButtonTitle()}</button>
        <button data-testid="quit-button" className="submit" onClick={handleClick}>Quit</button>
      </form>
    </div>
  );
}

// needs to be updated to validate whether number of picked answers matches the
// number of correct answers in answers array
const validate = (formValues) => {
  const errors = {}

  if(!formValues.answer){
    errors.answer = "You must pick an answer"
  }

  return errors
}

export default reduxForm({ form: 'pickedAnswer', enableReinitialize: true })(PickAnswer)
