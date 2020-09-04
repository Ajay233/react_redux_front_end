import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import DropdownList from './dropdown/dropdownList';
import { setDropDownState } from './actions'
import { setNotification } from '../notifications/actions'
import { logOut } from '../authentication/actions'
import { getAllQuizes, clearQuizes } from '../quizSearch/actions'
import { enableDarkMode, enableLightMode } from '../components/actions'
import '../stylesheets/navBar.css'
import '../stylesheets/buttons.css'

class NavBar extends React.Component {

  componentDidMount(){
    this.toggleRef = React.createRef();
  }

  handleThemeToggleClick = () => {
    const { enableDarkMode, enableLightMode, globals } = this.props
    let main = document.getElementById('mainStyling')
    let links = document.getElementById('linkStyling')
    if(globals.enableDarkMode){
      enableLightMode()
      main.href = "/./lightStyling.css"
      links.href = "/./links-light.css"
      this.toggleRef.current.setAttribute('checked', true)
    } else {
      enableDarkMode()
      main.href = "/./main.css"
      links.href = "/./links.css"
      this.toggleRef.current.removeAttribute('checked')
    }
  }

  renderThemeToggle = () => {
    const { enableDarkMode } = this.props.globals
    const { loggedIn } = this.props.userData
    if(loggedIn){
      return(
        <div className="toggle">
            <i className="fas fa-yin-yang"></i> Toggle Theme
            <label className="switch">
              <input
                ref={this.toggleRef}
                id="darkModeToggle"
                type="checkbox"
                onClick={this.handleThemeToggleClick}
              />
              <span className="slider round"></span>
            </label>
        </div>
      );
    } else {
      return null
    }
  }

  renderList = () => {
    const { setNotification, logOut, getAllQuizes, clearQuizes, navBarState, userData } = this.props
    return( navBarState.showDropDown ?
      <DropdownList
        setNotification={setNotification}
        logOut={logOut}
        getAllQuizes={getAllQuizes}
        clearQuizes={clearQuizes}
        toggleTheme={this.handleThemeToggleClick}
        loggedIn={userData.loggedIn}
        permission={userData.permission}
        jwt={userData.jwt}
      /> : null
    );
  }

  handleShowList = () => {
    const { showDropDown } = this.props.navBarState
    showDropDown ? this.hideList() : this.showList()
  }

  showList = () => {
    this.props.setDropDownState(true)
    document.addEventListener("click", this.toggleDropDown)
  }

  hideList = () => {
    this.props.setDropDownState()
    document.removeEventListener("click", this.toggleDropDown)
  }

  toggleDropDown = () => {
    const { showDropDown } = this.props.navBarState
    showDropDown ? this.hideList() : this.showList()
  }


  render(){
    return(
      <div>
        <div className="nav">
          <Link to="/" id="home" className="links"><i className="fas fa-home"></i> Home</Link>
          <button id="menu" className="linkButton links navItem" onClick={this.handleShowList}>Menu <i className="fas fa-bars"></i></button>
          <span className="navItem">{this.renderThemeToggle()}</span>
        </div>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    navBarState: state.navBarState,
    globals: state.globals
  };
}

export default connect(mapStateToProps,
  {
    setNotification,
    logOut,
    getAllQuizes,
    clearQuizes,
    enableDarkMode,
    enableLightMode,
    setDropDownState
  })( NavBar);
