import React from 'react'
import { connect } from 'react-redux'
import FindUserByEmail from '../forms/findUserByEmail'
import Notification from '../notifications/notifications'
import User from './user'
import UpdatePermission from '../forms/updatePermission'

import { setUserResults } from './actions'
import { setNotification } from '../notifications/actions'

import '../stylesheets/editUserPrivilege.css'

class EditUserPrivilege extends React.Component {

  renderUser = () => {
    return this.props.userResults.length === 0 ? null : <User userResults={this.props.userResults}/>;
  }

  renderUpdatePermission = () => {
    const {userResults, userData, setNotification, setUserResults} = this.props
    return this.props.userResults.length === 0 ? null : <UpdatePermission userResults={userResults} setUserResults={setUserResults} userData={userData} setNotification={setNotification} />;
  }

  render(){
    const { userData, setUserResults, setNotification } = this.props;
    return(
      <div id="editUserPrivilege">
        <Notification />
        <div>
        <FindUserByEmail userData={userData} setUserResults={setUserResults} setNotification={setNotification} />
        </div>
        <hr/>
        {this.renderUser()}
        {this.renderUpdatePermission()}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userResults: state.userResults
  }
}

export default connect(mapStateToProps, { setUserResults, setNotification })(EditUserPrivilege)
