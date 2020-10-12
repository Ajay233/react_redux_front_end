import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setNotification } from '../../notifications/actions'
import history from '../../history'

class HelpIndex extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')
      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    document.documentElement.scrollTop = 0;
  }

  render(){
    return(
      <div className="componentContainer">
        <div className="helpTitleContainer">
          <div className="helpTitleImgContainer"><img src={require("../../public/icons/helpIconV2.png")} className="helpTitleImg" alt=""/></div>
          <div className="helpTitle">Quiz Manger Help</div>
        </div>
        <div className="helpIndex">
          <ul className="helpIndexList">
            <div className="helpIndexListColumn">
            <li className="helpListItem">
              <img src={require("../../public/icons/idV2.png")} className="helpImg" alt=""/>
              <div className="helpLinkContainer"><Link to="/help/accountManagementHelp" className="helpLink">Account Management Help</Link></div>
            </li>
            <li className="helpListItem">
              <img src={require("../../public/icons/privilege.png")} className="helpImg" alt=""/>
              <div className="helpLinkContainer"><Link to="/help/editingUserPrivilegesHelp" className="helpLink">Editing User Privileges</Link></div>
            </li>
            <li className="helpListItem">
              <img src={require("../../public/icons/access.png")} className="helpImg" alt=""/>
              <div className="helpLinkContainer"><Link to="/help/userRolesHelp" className="helpLink">User Roles</Link></div>
            </li>
            </div>
            <div className="helpIndexListColumn">
            <li className="helpListItem">
              <img src={require("../../public/icons/quizManagement.png")} className="helpImg" alt=""/>
              <div className="helpLinkContainer"><Link to="/help/managingQuizzesHelp" className="helpLink">Managing Quizzes</Link></div>
            </li>
            <li className="helpListItem">
              <img src={require("../../public/icons/search.png")} className="helpImg" alt=""/>
              <div className="helpLinkContainer"><Link to="/help/findingQuizzesHelp" className="helpLink">Finding Quizzes</Link></div>
            </li>
            <li className="helpListItem">
              <img src={require("../../public/icons/test.png")} className="helpImg" alt=""/>
              <div className="helpLinkContainer"><Link to="/help/takingQuizzesHelp" className="helpLink">Taking a Quiz</Link></div>
            </li>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps, { setNotification })(HelpIndex)
