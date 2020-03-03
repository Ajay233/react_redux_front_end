import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setUser,
  setLoginStatus,
  setJwt,
  logOutUser
} from './actions'
import axios from 'axios';


class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showVerified: false,
      doVerify: this.props.verify,
      response: "",
      error: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.setUser(response.data.user);
      this.props.setJwt(response.data.jwt);
      this.props.setLoginStatus(true);
      this.setResponse(response);
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
export default connect(
  mapStateToProps, {
    setUser,
    setLoginStatus,
    setJwt,
    logOutUser
  })(Login);
