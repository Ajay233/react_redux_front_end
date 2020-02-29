import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render(){
    return(
      <div>
        Login below
        <form>
          <input></input>
          <input></input>
          <button>Go</button>
        </form>
        <div>
          Don't have an account? <Link to="/signUp">Sign up</Link> here
        </div>
      </div>
    );
  }
}

export default Login;
