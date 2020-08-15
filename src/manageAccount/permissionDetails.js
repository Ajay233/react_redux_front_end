import React from 'react'

const PermissionDetails = (props) => {

  const renderDetails = () => {
    switch (props.permission) {
      case "USER": return renderUserDetails();
      case "READ-ONLY": return renderReadOnlyDetails();
      case "ADMIN": return renderAdminDetails();
      default: return renderSuperUserDetails();
    }
  }

  const renderSuperUserDetails = () => {
    return(
      <div className="permissionDetailsText">
        <div>{`The ${props.permission} privelege provides access to the following features:`}</div>
        <ul>
          <li>Option to find users and edit their privilege levels</li>
          <li>Option to list all users</li>
          <li>Read & Write privileges on all quizzes, questions and answers</li>
          <li>Option to create quizzes</li>
          <li>Option to search for a quiz by name or category</li>
          <li>Option to browse all quizzes</li>
          <li>Option to take a quiz</li>
        </ul>
      </div>
    );
  }

  const renderAdminDetails = () => {
    return(
      <div className="permissionDetailsText">
        <div>{`The ${props.permission} privelege provides access to the following features:`}</div>
        <ul>
          <li>Read & Write privileges on all quizzes, questions and answers</li>
          <li>Option to create quizzes</li>
          <li>Option to search for a quiz by name or category</li>
          <li>Option to browse all quizzes</li>
          <li>Option to take a quiz</li>
        </ul>
      </div>
    );
  }

  const renderReadOnlyDetails = () => {
    return(
      <div className="permissionDetailsText">
        <div>{`The ${props.permission} privelege provides access to the following features:`}</div>
        <ul>
          <li>Read privileges on all quizzes, questions and answers</li>
          <li>Option to search for a quiz by name or category</li>
          <li>Option to browse all quizzes</li>
          <li>Option to take a quiz</li>
        </ul>
      </div>
    );
  }

  const renderUserDetails = () => {
    return(
      <div className="permissionDetailsText">
        <div>{`The ${props.permission} privelege provides access to the following features:`}</div>
        <ul>
          <li>Option to search for a quiz by name or category</li>
          <li>Option to browse all quizzes</li>
          <li>Option to take a quiz</li>
        </ul>
      </div>
    );
  }

  return(
    <div className="permissionDetailsContainer">
      <div className="permissionDetails">
        <div className="permissionDetailsHeading">
          <img src={require("../public/icons/access.png")} className="permissionImg" alt=""/>
          <div id="permissionDetailsTitle">{`${props.permission} privelege`}</div>
        </div>
          {renderDetails()}
      </div>
    </div>
  );
}

export default PermissionDetails
