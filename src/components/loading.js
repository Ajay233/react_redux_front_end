import React from 'react'

const Loading = (props) => {
  return(
    <div className="loadingBackground">
      <div className="loadingIconContainer">
        <div className="loadingIcon"></div>
        <div className={`loadingLabel ${props.label ? props.label : ''}`}>{props.message}</div>
      </div>
    </div>
  );
}

export default Loading
