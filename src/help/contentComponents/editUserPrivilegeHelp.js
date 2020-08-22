import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from './sideBar'

class EditUserPrivilegeHelp extends React.Component {
  render(){
    return(
      <div className="componentContainer-alt">


          <div className="helpSideBar">
            <SideBar />
          </div>
          <div className="helpContent">
            <div className="helpSectionSpacing">
              <div className="title-large-spaced">Editing user privileges</div>
              <div className="title-medium-left-alt bold"></div>
              <div className="">
                To edit a user’s privilege first click on the drop down menu and select the ‘edit user privilege’ option.
              </div>
            </div>
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="spacedParagraph">
                Next you will need to enter the user’s email address and then click the search button.  You will
                have received a request from a user to upgrade their access privilege which will contain the user’s
                email address.
              </div>
              <img src={require(`../../public/help/editUserPrivileges/1.png`)} className="screenshot" alt=""/>
              <img src={require(`../../public/help/editUserPrivileges/2.png`)} className="screenshot" alt=""/>
              <div className="warning spacedParagraph">
                <b><i className="fas fa-exclamation-triangle"></i> Note:</b> You won’t be allowed to perform the
                search without first entering an email address
              </div>
              <img src={require(`../../public/help/editUserPrivileges/3.png`)} className="screenshot" alt=""/>
            </div>
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="spacedParagraph">
                Once found, the user’s account details will be displayed below the search bar.
              </div>
              <img src={require(`../../public/help/editUserPrivileges/4.png`)} className="screenshot" alt=""/>
              <div className="spacedParagraph">
                You will also be provided with a drop down where you can select from the list of access privileges
                you which to set the user’s access privilege to.
              </div>
              <img src={require(`../../public/help/editUserPrivileges/5.png`)} className="screenshot" alt=""/>
              <div className="spacedParagraph">
                Select an option and then click save.
              </div>
              <img src={require(`../../public/help/editUserPrivileges/6.png`)} className="screenshot" alt=""/>
              <div className="spacedParagraph">
                A notification will be displayed confirming the successful change to the selected user's privilege level.
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default EditUserPrivilegeHelp
