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
    this.imgRef = React.createRef();
  }

  // take a parameter to determine an icon needs to be rendered
  // decide if timer needs to be applied
  // decide what icon to rende
  // make a close button

  renderMsg = () => {
    const { setNotification } = this.props;
    const { show, type, timed } = this.props.notificationData;
    if(show){
      if (timed) timedFunc(3470, setNotification);
      document.documentElement.scrollTop = 0;
      return isIconRequired(type) ? this.renderMsgWithIcon(type, timed) : this.renderStandardMsg(type)
    } else {
      return null;
    }
  }

  renderMsgWithIcon = (type, timed) => {
    return(
      <div
        ref={this.notificationRef}
        id="notification"
        className={`spacing ${type}${timed ? "shrinkNotification" : ""}`}
      >
        {timed ? null : <span className="close" onClick={this.handleClose}><i className="far fa-times-circle"></i></span>}
        <div className="notificationBody">
          <div className="notificationImg">
            <img ref={this.imgRef} src={require(`../public/icons/${iconPicker(type)}`)} className={`img ${timed ? "shrinkImg" : ""}`} alt=""/>
          </div>
          <div className="notificationText">
            {this.props.notificationData.message}
          </div>
        </div>
      </div>
    );
  }

  renderStandardMsg = (type) => {
    return(
      <div
        ref={this.notificationRef}
        id="notification"
        className={`spacing shrinkNotification ${type}`}
      >
        {this.props.notificationData.message}
      </div>
    );
  }

  handleClose = () => {
    const { setNotification } = this.props;
    this.notificationRef.current.classList.add("shrinkNotificationNow")
    this.imgRef.current.classList.add("shrinkImgNow")
    window.setTimeout(function(){
      setNotification();
    }, 487)
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
