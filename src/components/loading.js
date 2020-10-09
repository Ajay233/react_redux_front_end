import React from 'react'

const Loading = (props) => {
  return(
    <div className="loadingBackground">
      <div className="loadingIconContainer">
        <div className="loadingIcon"></div>
        <div className="loadingLabel">Loading...</div>
      </div>
    </div>
  );
}

export default Loading
