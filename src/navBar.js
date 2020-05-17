import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import DropdownList from './dropdown/dropdownList';
import history from './history'
import './stylesheets/navBar.css'
import './stylesheets/buttons.css'
// import { home } from './public/icons/home.png'

class NavBar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      show: false
    }
  }

  renderList = () => {
    return this.state.show === true ? <DropdownList show={this.showList}/> : null;
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

  handleGoingBack = () => {
    history.goBack();
  }

  // renderBackButton = () => {
  //     const url = window.location.href
  //     return url === "http://localhost:3000/" ? null : <Link className="linkButton links navItem" to="#" onClick={this.handleGoingBack}><i className="fas fa-chevron-left"></i> Back</Link>
  // }

// <Link to="/" id="home" className="links"><img src={require("./public/icons/home.png")} width="22px"/> Home</Link>
  render(){
    return(
      <div>
        <div className="nav">
          <Link to="/" id="home" className="links"><i className="fas fa-home"></i> Home</Link>
          <button className="linkButton links navItem" onClick={this.showList}>Menu <i className="fas fa-bars"></i></button>
          {console.log("Rendering")}

        </div>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {userData: state.userData};
}

export default connect(mapStateToProps)( NavBar);
