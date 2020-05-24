import React from 'react'
import { connect } from 'react-redux'
import FindUserByEmail from '../forms/findUserByEmail'
import Notification from '../notifications/notifications'
import User from './user'
import UpdatePermission from '../forms/updatePermission'

import { setUserResults, clearUserResults } from './actions'
import { setNotification } from '../notifications/actions'

import '../stylesheets/editUserPrivilege.css'

export class EditUserPrivilege extends React.Component {

  componentWillUnmount(){
    this.props.clearUserResults()
  }

  renderUser = () => {
    return Object.entries(this.props.userResults).length === 0 ? null : <div><hr/><User userResults={this.props.userResults}/></div>;
  }

  renderUpdatePermission = () => {
    const {userResults, userData, setNotification, clearUserResults} = this.props
    return Object.entries(this.props.userResults).length === 0 ? null : <UpdatePermission userResults={userResults} clearUserResults={clearUserResults} userData={userData} setNotification={setNotification} />;
  }

  render(){
    const { userData, setUserResults, setNotification } = this.props;
    return(
      <div id="editUserPrivilege">
        <Notification />
        <div>
        <FindUserByEmail userData={userData} setUserResults={setUserResults} setNotification={setNotification} />
        </div>
        {this.renderUser()}
        {this.renderUpdatePermission()}

      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userResults: state.userResults
  }
}

export default connect(mapStateToProps, { setUserResults, clearUserResults, setNotification })(EditUserPrivilege)
