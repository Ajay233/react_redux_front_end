import React from 'react';
import { Field, reduxForm } from 'redux-form';

class QuizSearchByCategory extends React.Component {

  renderInput = (formProps) => {
    return(
      <div>
        {this.renderError(formProps.meta)}
        <label>{formProps.label}</label>
        <select {...formProps.input} className="inputBox select">
          {formProps.children}
        </select>
      </div>
    );
  }

  renderError = (meta) => {
    const { error, touched } = meta
    return error && touched ? <div className="error-medium"><i className="fas fa-exclamation-circle"></i> {error}</div> : null
  }

  onSubmit = ({ category }) => {
    const { jwt, permission, getQuizSearchResults } = this.props;
    const param = {category: category}
    const errorMsg = `No match found for: ${category}`
    getQuizSearchResults("quiz/findByCategory", param, jwt, permission, errorMsg);
  }

  renderOptions = () => {
    const { categories } = this.props;
    let optionsList = categories.map(category => {
      return <option key={categories.indexOf(category)} value={category}>{category}</option>
    })
    return optionsList;
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="category" component={this.renderInput} label="Quiz category:">
            <option value="" disabled>Select a category</option>
            {this.renderOptions()}
          </Field>
          <button className="submit"><i className="fas fa-search"></i> Search</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const { category } = formValues
  const errors = {}
  if(!category){
    errors.category = "You must select a category to search for a quiz by category"
  }
  return errors
}

export default reduxForm({ form: 'quizCategory', validate: validate })(QuizSearchByCategory)
