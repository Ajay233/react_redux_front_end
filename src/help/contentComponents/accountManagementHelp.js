import React from 'react'
import { Link } from 'react-router-dom'

class AccountManagementHelp extends React.Component {
  render(){
    return(
      <div className="componentContainer">
        <div className="title-large-spaced">Account Management Help</div>
        <div className="helpSectionSpacing">
          <div className="title-medium-left-alt">Updating user details</div>
          <div className="">
            The first row in the account management page provides you with the details currently
            held about you which were entered during sign up.  You can change any of these fields
            by making the edits in the field and clicking submit.
          </div>
          <div className="">You will see a notification to confirm the request was successful</div>
        </div>
        <div className="helpSectionSpacing">
          <div className="title-medium-left-alt">Updating your password</div>
          <div className="">
            The second row gives you the option to change your password.  You will need to enter you old
            password and the the new password will need to be entered twice to ensure it is correct.
          </div>
          <div className="">If successful you will receive a confirmation email</div>
          <div className="">
            If any of the details are incorrect e.g. the existing password you supplied was not matched or the
            new and retyped passwords did not match, you will receive a notification to confirm the request was
            unsuccessful and why.
          </div>
        </div>
        <div className="helpSectionSpacing">
          <div className="title-medium-left-alt">Privilege change requests</div>
          <div className="">
            If you need to gain a greater level of access to the app you will gave to have your access privilege raised.
            To do this you will have to make a request for a super-user to review and action.
          </div>
          <div className="">
            Simply select the level you want to be upgraded to and click submit.  N.B - the button is disabled by
            default and is only usable when you make a selection.
          </div>
          <div className="">
            Once you have submitted the request, you will receive a notification to confirm the request has been made.
          </div>
          <div className="">
            Once your request has been reviewed and actioned, you will receive an email to confirm your access
            privilege has been increased.  This will also confirm the level the super-user has set your privilege to.
          </div>
        </div>
        <div className="helpSectionSpacing">
          <div className="title-medium-left-alt">Delete account</div>
          <div className="">
            At the bottom of the page you have the option to delete your account.  Please note that this will
            completely remove your account from the system.  We will not hold any details about your account
            following this so it is important to note that it will be impossible to reverse this action.
          </div>
        </div>
      </div>
    );
  }
}

export default AccountManagementHelp
