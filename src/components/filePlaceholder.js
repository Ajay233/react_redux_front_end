import React from 'react'

const FilePlaceholder = (props) => {

  const renderMessage = () => {
    if(props.permission !== 'READ-ONLY' && props.permission !== 'USER'){
      return(
        <div className="placeholderBackground">If you add an image or gif file, a preview will be shown here</div>
      );
    } else {
      return(
        <div className="placeholderBackground">
          {`There is currently no image for this ${props.type === 'question' ? 'question' : 'quiz'}`}
        </div>
      );
    }
  }

  return(
    <div className={`${props.size === 'largePlaceholder' ? "largeImgPlaceholderContainer" : "imgPlaceholderContainer"}`}>
      <div className="placeholderImgContainer">
        <div className="placeholderImg">
          <i className="fas fa-photo-video"></i>
        </div>
      </div>
      {renderMessage()}
    </div>
  );
}

export default FilePlaceholder
