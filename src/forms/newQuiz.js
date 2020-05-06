import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addQuiz } from '../quizSearch/actions'
import { setNotification } from '../notifications/actions'
import { post } from '../axiosRequests/requests'



class NewQuizForm extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        <label>{ formProps.label }</label>
        <input {...formProps.input} className="inputBox"/>
      </div>
    )
  }

  renderSelect = (formProps) => {
    return(
      <div>
        <label>{ formProps.label }</label>
        <select {...formProps.input} className="inputBox">
          {formProps.children}
        </select>
      </div>
    );
  }

  onSubmit = ({ name, description, category }) => {
    const { userData, setNotification, addQuiz } = this.props;
    const body = {
      name: name,
      description: description,
      category: category
    }
    post("quiz/create", body, userData.jwt).then((response) => {
      addQuiz(response.data);
      setNotification("Quiz created", "success", true);
    }).catch((error) => {
      console.log(error.response);
      setNotification("Error - Unable to update quiz", "error", true);
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="name" component={this.renderInput} label="Quiz name:"/>
          <Field name="description" component={this.renderInput} label="Quiz description:"/>
          <Field name="category" component={this.renderSelect} label="Quiz category:">
            <option value="Comics">Comics</option>
            <option value="type1">type1</option>
            <option value="type2">type2</option>
            <option value="type3">type3</option>
          </Field>
          <div>
            <button className="submit">Save</button><Link to="/quizSearch">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    initialValues: {
      category: "Comics"
    },
    userData: state.userData
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

export default connect(mapStateToProps, { setNotification, addQuiz })(reduxForm({ form: 'quizForm' })(NewQuizForm))
