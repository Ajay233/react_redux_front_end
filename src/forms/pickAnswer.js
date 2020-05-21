import React from 'react'
import { Field, reduxForm } from 'redux-form'
import history from '../history'

const PickAnswer = (props) => {

  const renderInput = (formProps) => {
    return(
      <div>
        <label><input {...formProps.input} type={formProps.type} className="radioInput"/>{formProps.label}</label>
      </div>
    );
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
        <button className="submit" disabled={props.pristine}>{renderButtonTitle()}</button>
        <button className="submit" onClick={handleClick}>Quit</button>
      </form>
    </div>
  );
}

export default reduxForm({ form: 'pickedAnswer', enableReinitialize: true })(PickAnswer)
