import React from 'react'
import { Link } from 'react-router-dom'

class SideBar extends React.Component {
  render(){
    return(
      <div>
      <div className="">
        <div id="sideBarTitleImg"><img src={require("../../public/icons/helpIconV2.png")} className="helpTitleImg" alt=""/></div>
        <div id="sideBarTitle">Quiz Manger Help</div>
      </div>
      <ul className="">
        <li className="sideBarListItem">
          <img src={require("../../public/icons/idV2.png")} className="helpImg" alt=""/>
          <div className="helpLinkContainer"><Link to="/help/accountManagementHelp" className="sideBarLinks">Account Management Help</Link></div>
        </li>
        <li className="sideBarListItem">
          <img src={require("../../public/icons/privilege.png")} className="helpImg" alt=""/>
          <div className="helpLinkContainer"><Link to="/help/editingUserPrivilegesHelp" className="sideBarLinks">Editing User Privileges</Link></div>
        </li>
        <li className="sideBarListItem">
          <img src={require("../../public/icons/access.png")} className="helpImg" alt=""/>
          <div className="helpLinkContainer"><Link to="/help/userRolesHelp" className="sideBarLinks">User Roles</Link></div>
        </li>
        <li className="sideBarListItem">
          <img src={require("../../public/icons/quizManagement.png")} className="helpImg" alt=""/>
          <div className="helpLinkContainer"><Link to="/help/managingQuizzesHelp" className="sideBarLinks">Managing Quizzes</Link></div>
        </li>
        <li className="sideBarListItem">
          <img src={require("../../public/icons/search.png")} className="helpImg" alt=""/>
          <div className="helpLinkContainer"><Link to="/help/findingQuizzesHelp" className="sideBarLinks">Finding Quizzes</Link></div>
        </li>
        <li className="sideBarListItem">
          <img src={require("../../public/icons/test.png")} className="helpImg" alt=""/>
          <div className="helpLinkContainer"><Link to="/help/takingQuizzesHelp" className="sideBarLinks">Taking a Quiz</Link></div>
        </li>
      </ul>
      </div>
    );
  }
}

export default SideBar
