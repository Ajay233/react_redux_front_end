import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import DropdownList from './dropdown/dropdownList';
import { setNotification } from './notifications/actions'
import { logOut } from './authentication/actions'
import { getAllQuizes, clearQuizes } from './quizSearch/actions'
import { enableDarkMode, enableLightMode } from './components/actions'
import './stylesheets/navBar.css'
import './stylesheets/buttons.css'

class NavBar extends React.Component {

  //TODO This needs to be removed and the functionality converted to use redux
  constructor(props){
    super(props)
    this.state = {
      show: false,
      rerender: false
    }
  }

  componentDidMount(){
    this.toggleRef = React.createRef();
  }

  handleThemeToggleClick = () => {
    const { enableDarkMode, enableLightMode, globals } = this.props
    let main = document.getElementById('mainStyling')
    let links = document.getElementById('linkStyling')
    if(globals.enableDarkMode){
      enableLightMode()
      main.href = "./lightStyling.css"
      links.href = "./links-light.css"
      this.toggleRef.current.setAttribute('checked', true)
    } else {
      enableDarkMode()
      main.href = "./main.css"
      links.href = "./links.css"
      this.toggleRef.current.removeAttribute('checked')
    }
  }

  renderThemeToggle = () => {
    const { enableDarkMode } = this.props.globals
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
  }

  renderList = () => {
    const { setNotification, logOut, getAllQuizes, clearQuizes } = this.props
    return( this.state.show === true ?
      <DropdownList
        show={this.showList}
        setNotification={setNotification}
        logOut={logOut}
        getAllQuizes={getAllQuizes}
        clearQuizes={clearQuizes}
        toggleTheme={this.handleThemeToggleClick}
      /> : null
    );
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
          <Link to="/" id="home" className="links"><i className="fas fa-home"></i> Home</Link>
          <button className="linkButton links navItem" onClick={this.showList}>Menu <i className="fas fa-bars"></i></button>
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
    enableLightMode
  })( NavBar);
