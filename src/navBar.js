import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import {
  logOutUser
} from './authentication/actions'
import DropDown from './dropdown/dropdown'
import DropdownList from './dropdown/dropdownList';
import './stylesheets/navBar.css'
import './stylesheets/buttons.css'

class NavBar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      show: false
    }
  }

  logOut = () => {
    this.props.logOutUser();
  }

  renderSignUp = () => {
    return this.props.userData.loggedIn === true ? null : <Link to="/signup" className="links">Go to Sign Up</Link>
  }

  renderLogin = () => {
    return this.props.userData.loggedIn === true ? null : <Link to="/login" className="links">Go to Login</Link>
  }

  renderLogout = () => {
    return this.props.userData.loggedIn === true ? <button className="linkButton links" onClick={this.logOut}>Logout</button> : null
  }

  renderListUser = () => {
    return this.props.userData.loggedIn === true ? <Link to="/userList" className="links">List all Users</Link> : null
  }

  renderList = () => {
    return this.state.show === true ? <DropdownList logOutUser={this.props.logOutUser} show={this.showList}/> : null;
  }

  // removed call to this method as this needs to be changed so this does not continually redirect to logout
  redirect = () => {
    return this.props.userData.loggedIn === false ? <Redirect to="/logout" /> : null
  }

  showList = () => {
    let bool = !this.state.show;
    this.setState({ show: bool }, () => {
      this.state.show === true ? document.addEventListener("click", this.showList) : document.removeEventListener("click", this.showList);
    })
  }

  render(){
    return(
      <div>
      <div className="nav">
        <Link to="/" id="home" className="links">Home</Link>
        <button className="linkButton links navItem" onClick={this.showList}>Menu</button>
      </div>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {userData: state.userData};
}

export default connect(mapStateToProps, {logOutUser})( NavBar);
