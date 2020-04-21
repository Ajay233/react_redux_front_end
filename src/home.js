import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from './notifications/actions'
import './stylesheets/animations.css'

import Notification from './notifications/notifications'

class Home extends React.Component {

  constructor(props){
    super(props)

    this.msgRef = React.createRef();

  }

  renderWelcome = () => {
    if(this.props.userData.loggedIn === true && this.props.redirect.status === true){
      this.props.setNotification(`Welcome back ${this.props.userData.forename}`, "success", true)
      // fadeOut(this.msgRef);
      // return <div ref={this.msgRef} id="welcomeBack">Welcome back {this.props.userData.forename}</div>
    }
  }

  render(){
    return(
      <div>
        {this.renderWelcome()}
        <div>The Quiz App</div>
        <Notification />
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
