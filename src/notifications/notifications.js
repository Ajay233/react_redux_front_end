import React from 'react'
import '../stylesheets/notifications.css'
import '../stylesheets/buttons.css'
import { connect } from 'react-redux';
import { setNotification } from './actions'

import { timedFunc } from '../utils/display'
import { isIconRequired, iconPicker } from '../utils/icons'

class Notification extends React.Component {

  // take a parameter to determine an icon needs to be rendered
  // decide if timer needs to be applied
  // decide what icon to rende
  // make a close button

  renderMsg = () => {
    const { setNotification } = this.props;
    const { type } = this.props.notificationData;
    if(this.props.notificationData.show){
      console.log(isIconRequired(type));
      if (!isIconRequired(type)) timedFunc(4000, setNotification);
      return isIconRequired(type) ? this.renderMsgWithIcon(type) : this.renderStandardMsg(type)
    } else {
      return null;
    }
  }

  renderMsgWithIcon = (type) => {
    return(
      <div className={type != null ? type : null} >
        <span className="close" onClick={this.handleClose}><i className="far fa-times-circle"></i></span>
        <span><span><img src={require(`../public/icons/${iconPicker(type)}`)} className="img"/></span>{this.props.notificationData.message}</span>
      </div>
    );
  }

  renderStandardMsg = (type) => {
    return(
      <div className={type != null ? type : null} >
        <span className="close" onClick={this.handleClose}><i className="far fa-times-circle"></i></span>
        {this.props.notificationData.message}
      </div>
    );
  }

  handleClose = () => {
    this.props.setNotification();
  }

  render(){
    return(
      <div className="spacing">
        {this.renderMsg()}
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
