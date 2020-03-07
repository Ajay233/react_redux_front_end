import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      forename: "",
      surname: "",
      email: "",
      password: "",
      response: "",
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setResponse = (responseData) => {
    this.setState({ response: responseData })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/users/auth/signUp',{
        'forename': this.state.forename,
        'surname': this.state.surname,
        'email': this.state.email,
        'password': this.state.password
    }).then((response) => {
      this.setResponse(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  render(){
    return(
      <div>
        Sign up below
        <form onSubmit={this.handleSubmit}>
          <input name="forename" onChange={this.handleChange}></input>
          <input name="surname" onChange={this.handleChange}></input>
          <input name="email" onChange={this.handleChange}></input>
          <input name="password" onChange={this.handleChange}></input>
          <button>Go</button>
        </form>
        <div>{this.state.response}</div>
        <div>{this.state.response === "" ? null :
        "An email has been sent to the email address you provided.  \n\n Please login and click the link provided to verify your email address and complete the registration process.  \n\n Once your email address has been verified you will be able to log into the quiz app"}</div>
      </div>
    );
  }
}

export default SignUp;
