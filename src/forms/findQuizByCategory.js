import React from 'react';
import { Field, reduxForm } from 'redux-form';

class QuizSearchByCategory extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        <select {...formProps.input} className="inputBox">
          {formProps.children}
        </select>
      </div>
    );
  }

  onSubmit = ({ category }) => {
    const { jwt, setNotification, getQuizSearchResults } = this.props;
    const param = {category: category}
    const errorMsg = `No match found for: ${category}`
    getQuizSearchResults("quiz/findByCategory", param, jwt, setNotification, errorMsg);
  }

  // ToDo:
  // Add a table for lookups
  // Add all categories to it (each category will be lookup type = category)
  // Make an endpoint for getting a list of all categories
  // Add componentDidMount and make the call to the endpoint within the componentDidMount method
  // Save response to a lookup redux state
  // use the list to populate the options

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="category" component={this.renderInput} label="Quiz category:">
            <option>Select a category</option>
            <option value="Comics">Comics</option>
            <option value="type1">type1</option>
            <option value="type2">type2</option>
            <option value="type3">type3</option>
          </Field>
          <button className="submit"><i className="fas fa-search"></i> Search</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'quizCategory' })(QuizSearchByCategory)
