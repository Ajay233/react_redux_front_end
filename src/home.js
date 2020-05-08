import React from 'react'
import { connect } from 'react-redux'
import './stylesheets/animations.css'
import './stylesheets/home.css'

import { getCategories } from './lists/actions'

import Notification from './notifications/notifications'

class Home extends React.Component {

  fetchInitialData = () => {
    const { userData, getCategories } = this.props;
    return userData.loggedIn ? getCategories(userData.jwt) : null;
  }

  render(){
    return(
      <div className="body">
        {this.fetchInitialData()}
        <div id="notificationContainer">
        <Notification />
        </div>
        <div className="textBackground">
          <div className="title">The Quiz App</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    verificationProcess: state.verificationProcess,
    redirect: state.redirect
  }
}

export default connect(mapStateToProps, { getCategories })(Home)
