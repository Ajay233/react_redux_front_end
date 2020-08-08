import React from 'react'
import '../stylesheets/notifications.css'
import '../stylesheets/buttons.css'
import { connect } from 'react-redux';
import { setNotification } from './actions'

import { timedFunc } from '../utils/display'
import { isIconRequired, iconPicker } from '../utils/icons'

class Notification extends React.Component {

  componentDidMount(){
    this.notificationRef = React.createRef();
  }

  // take a parameter to determine an icon needs to be rendered
  // decide if timer needs to be applied
  // decide what icon to rende
  // make a close button

  renderMsg = () => {
    const { setNotification } = this.props;
    const { type } = this.props.notificationData;
    if(this.props.notificationData.show){
      if (!isIconRequired(type)) timedFunc(3000, this.notificationRef, setNotification);
      document.documentElement.scrollTop = 0;
      return isIconRequired(type) ? this.renderMsgWithIcon(type) : this.renderStandardMsg(type)
    } else {
      return null;
    }
  }

  renderMsgWithIcon = (type) => {
    return(
      <div ref={this.notificationRef} id="notification" className={`spacing ${type != null ? type : null}`}>
        <span className="close" onClick={this.handleClose}><i className="far fa-times-circle"></i></span>
        <span><span><img src={require(`../public/icons/${iconPicker(type)}`)} className="img" alt=""/></span>{this.props.notificationData.message}</span>
      </div>
    );
  }

  renderStandardMsg = (type) => {
    return(
      <div ref={this.notificationRef} id="notification" className={`spacing ${type != null ? type : null}`}>
        {this.props.notificationData.message}
      </div>
    );
  }

  handleClose = () => {
    const { setNotification } = this.props;
    this.notificationRef.current.classList.add("shrinkNotification")
    window.setTimeout(function(){
      setNotification();
    }, 488)
  }

  render(){
    return(
      <React.Fragment>
        {this.renderMsg()}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    notificationData: state.notificationData
  }
}

export default connect(mapStateToProps, { setNotification })(Notification)
