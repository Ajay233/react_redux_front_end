import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from './notifications/actions'
import './stylesheets/animations.css'
import './stylesheets/home.css'

import Notification from './notifications/notifications'

class Home extends React.Component {

  render(){
    return(
      <div className="body">
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

export default connect(mapStateToProps, { setNotification })(Home)
