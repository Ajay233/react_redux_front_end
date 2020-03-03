import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      showVerified: false,
      doVerify: this.props.verify,
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

  setLoggedIn = (status) => {
    this.setState({ loggedIn: status });
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
      this.setLoggedIn(true);
      console.log(response)
    }).catch((error) => {
      this.setError(error);
      console.log(error);
    });
  }

  welcomeMsg = () => {
    return <h1>Welcome back {this.state.forename}!!</h1>;
  }

  verifiedMsg = () => {
    return `Thank you {this.state.forename}, your email has now been verified.  Please login below to use the quiz app :)`
  }

  render(){
    return(
      <div>
        <div>{this.state.showVerified === true ? this.verifiedMsg() : null}</div>
        {this.state.loggedIn === true ? this.welcomeMsg() : null}
        <div>
          Login below
        </div>
        <form onSubmit={this.handleSubmit}>
          <input name="email" onChange={this.handleChange}></input>
          <input name="password" onChange={this.handleChange}></input>
          <button>Go</button>
        </form>
        <div>
          Don't have an account? <Link to="/signUp">Sign up</Link> here
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {user: state.user};
}
// export default Login;
export default connect(mapStateToProps)(Login);
