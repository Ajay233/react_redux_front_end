import React from 'react';
import axios from 'axios';
import Login from './login'

class Verify extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      verified: false,
      error: ""
    };
  }

  componentDidMount(){
    this.verifyUser();
  }

  setVerified = (status) => {
    this.setState({ verified: status })
  }

  setError = (status) => {
    this.setState({ error: status })
  }

  verifiedMsg = () => {
    return "You are now verified";
  }

  errorMsg = () => {
    return "";
  }

  getToken = () => {
    let url = window.location.href;
    const regex = new RegExp(/(?<=token=)(s?)(.*)/gm);
    let token = url.match(regex).toString();
    return token;
  }

  verifyUser = (event) => {
    let token = this.getToken();
    axios.post('http://localhost:8080/users/auth/verify',{
        'userId': 0,
        'token': token
    }).then((response) => {
      this.setVerified(true);
      console.log(response)
    }).catch((error) => {
      this.setError(error);
      console.log(error);
    });
  }

  render(){
    return(
      <div>
        {this.state.verified === true ? this.verifiedMsg() : null}
        {this.state.verified === true ? <Login /> : null}
      </div>
    );
  }
}

export default Verify;
