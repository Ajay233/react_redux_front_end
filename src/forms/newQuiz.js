import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addQuiz } from '../quizSearch/actions'
import { setNotification } from '../notifications/actions'
import { post } from '../axiosRequests/requests'
import history from '../history'
import Notification from '../notifications/notifications'


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
      this.props.setNotification("Quiz created", "success", true);
    }).catch((error) => {
      console.log(error.response);
      this.props.setNotification("Error - Unable to update quiz", "error", true);
    })
  }

  render(){
    return(
      <div>
        <Notification />
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

export default connect(mapStateToProps, { setNotification, addQuiz })(reduxForm({ form: 'quizForm' })(NewQuizForm))
