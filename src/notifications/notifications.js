import React from 'react'
import '../stylesheets/notifications.css'
import { connect } from 'react-redux';
import { setNotification } from './actions'

import { timedFunc } from '../utils/display'

class Notification extends React.Component {

  renderMsg = () => {
    const { setNotification } = this.props;
    const { type } = this.props.notificationData;
    timedFunc(2000, setNotification);
    return (
      <div className={type != null ? type : null} >
        {this.props.notificationData.message}
      </div>
    );
  }

  render(){
    return(
      <div className="spacing">
        {this.props.notificationData.show === true ? this.renderMsg() : null}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    notificationData: state.notificationData
  }
}

export default connect(mapStateToProps, { setNotification })(Notification)
