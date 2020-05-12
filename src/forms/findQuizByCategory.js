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

export default reduxForm({ form: 'quizCategory' })(QuizSearchByCategory)
