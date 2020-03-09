import React from 'react'
import '../stylesheets/notifications.css'
import { connect } from 'react-redux';
import { setNotification } from './actions'

import { timedFunc } from '../utils/display'

class Notification extends React.Component {

  setStyle = () => {
    switch (this.props.notificationData.type) {
      case "error": return "error"; break;
      case "success": return "success"; break;
      case "warning": return "warning"; break;
      default: return null;
    };
  }

  renderMsg = () => {
    window.setTimeout(() => {
      this.props.setNotification();
    }, 2000);
    return (
      <div className={this.setStyle()} >
        {this.props.notificationData.message}
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.props.notificationData.show === true ? this.renderMsg() : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notificationData: state.notificationData
  }
}

export default connect(mapStateToProps, { setNotification })(Notification)
