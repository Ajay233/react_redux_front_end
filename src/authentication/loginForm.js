import React form 'react';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      forename: "",
      surname: "",
      response: "",
      error: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setForename = (firstName) => {
    this.setState({ forename: firstName });
  }

  setSurname = (lastName) => {
    this.setState({ surname: lastName });
  }

  setResponse = (success) => {
    this.setState({ response: success });
  }

  setError = (err) => {
    this.setState({ error: err });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/users/auth/login',{
        'email': this.state.email,
        'password': this.state.password
    }).then((response) => {
      this.setForename(response.data.user.forename);
      this.setSurname(response.data.user.surname);
      this.setResponse(response);
      console.log(response)
    }).catch((error) => {
      this.setError(error);
      console.log(error);
    });
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input name="email" onChange={this.handleChange}></input>
        <input name="password" onChange={this.handleChange}></input>
        <button>Go</button>
      </form>
    );
  }
}

export default LoginForm;
