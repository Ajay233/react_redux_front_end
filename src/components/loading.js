import React from 'react'
import { connect } from 'react-redux'

const Loading = (props) => {
  const { label, message } = props.globals.loaderState
  return(
    <div className="loadingBackground">
      <div className="loadingIconContainer">
        <div className="loadingIcon"></div>
        <div className={`loadingLabel ${label}`}>{message}</div>
      </div>
    </div>
  );
}

export const mapStateToProps = (state) => {
  return {
    globals: state.globals
  }
}

export default connect(mapStateToProps)(Loading)
