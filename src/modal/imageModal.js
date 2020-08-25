import React from 'react'
import ReactDOM from 'react-dom'

import '../stylesheets/modal.css'

const ImageModal = (props) => {

  // requires the following props:
  // title, show={this.props.modalState}, message, onCancel={this.props.hideModal}, onDelete

  return ReactDOM.createPortal(
    <div className={`${props.show ? "showModal" : "hide"}`} onClick={props.onCancel} >
      <div onClick={e => e.stopPropagation()} className="imageModalContainer">
        <div className="modalHeader">
          <span onClick={props.onCancel} className="closeModal"><i className="fas fa-times"></i></span>
        </div>
        <div className="">
          <div className="modalHeading"></div>
          <div className="modalMessage">
            { props.imgPath === null ? null : <img className="modalScreenshot" src={props.imgPath} alt="" />}
          </div>

        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
}

export default ImageModal
