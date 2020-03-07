import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setUser
} from './actions'

import { post } from '../axiosRequests/requests';
import '../stylesheets/notifications.css'

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showVerified: false,
      doVerify: this.props.verify,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const loginDetails =  {'email': this.state.email,'password': this.state.password}
    this.props.setUser('users/auth/login', loginDetails);
  }

  welcomeMsg = (user) => {
    if (user){
      if(user.loggedIn === true){
        return <h1>Welcome back {this.props.userData.forename}!!</h1>;
      }
    }
  }

  verifiedMsg = () => {
    return `Thank you, your email has now been verified.  Please login below to use the quiz app :)`
  }

  errorMsg = () => {
    if(this.props.userData.error){
      if(this.props.userData.error.data === "Incorrect username or password"){
        return <div className="error">The username or password you entered was incorrect</div>
      } else {
        return null
      }
    }
  }

  notVerifiedMsg = () => {

  }

  render(){
    return(
      <div>
        <div>{this.props.verificationProcess.completionStatus === "completed" ? this.verifiedMsg() : null}</div>
        {console.log(this.props)}
        {this.errorMsg()}
        {this.props.userData ? this.welcomeMsg(this.props.userData) : null}
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
  console.log(state.verificationProcess);
  return {
    userData: state.userData,
    verificationProcess: state.verificationProcess
  };
}
// export default Login;
export default connect(mapStateToProps, {setUser})(Login);
