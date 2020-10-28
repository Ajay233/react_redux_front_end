import React from 'react'

const Loading = (props) => {

  const renderLoader = () => {
    const { show, label, message } = props.loaderState
    if(show){
      return(
        <div className="loadingBackground">
          <div className="loadingIconContainer">
            <div className="loadingIcon"></div>
            <div className={`loadingLabel ${label}`}>{message}</div>
          </div>
        </div>
      );
    } else {
      return null
    }
  }

  return(
    <React.Fragment>
      {renderLoader()}
    </React.Fragment>
  );
}


export default Loading
