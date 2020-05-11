import React from 'react'
import ReactDOM from 'react-dom'

import '../stylesheets/modal.css'

const Modal = (props) => {

  // requires the following props:
  // title, show={this.props.modalState}, message, onCancel={this.props.hideModal}, onDelete

  const returnButton = (props) => {
    switch (props.type) {
      case "start": return <button className="startButton" onClick={props.onStart}>Start</button>;
      default: return <button className="delete" onClick={props.onDelete}>Delete</button>;
    }
  }

  return ReactDOM.createPortal(
    <div className={`${props.show ? "showModal" : "hide"}`} onClick={props.onCancel} >
      <div onClick={e => e.stopPropagation()} className="modalContent">
        <span onClick={props.onCancel} className="close"><i className="fas fa-times-circle red"></i></span>
        <div className="modalHeader">{`${props.title}`}</div>
        <div className="modalMessage">
          <img src={require('../public/icons/warning.png')} alt="" />
          <div className="txt">
            {props.message}
          </div>
        </div>
        <div className="modalActions">
          {returnButton(props)}
          <button className="submit" onClick={props.onCancel}>Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}

export default Modal
