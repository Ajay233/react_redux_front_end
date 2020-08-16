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
          <li className="listWithBullets">Option to find users and edit their privilege levels</li>
          <li className="listWithBullets">Option to list all users</li>
          <li className="listWithBullets">Read & Write privileges on all quizzes, questions and answers</li>
          <li className="listWithBullets">Option to create quizzes</li>
          <li className="listWithBullets">Option to search for a quiz by name or category</li>
          <li className="listWithBullets">Option to browse all quizzes</li>
          <li className="listWithBullets">Option to take a quiz</li>
        </ul>
      </div>
    );
  }

  const renderAdminDetails = () => {
    return(
      <div className="permissionDetailsText">
        <div>{`The ${props.permission} privelege provides access to the following features:`}</div>
        <ul>
          <li className="listWithBullets">Read & Write privileges on all quizzes, questions and answers</li>
          <li className="listWithBullets">Option to create quizzes</li>
          <li className="listWithBullets">Option to search for a quiz by name or category</li>
          <li className="listWithBullets">Option to browse all quizzes</li>
          <li className="listWithBullets">Option to take a quiz</li>
        </ul>
      </div>
    );
  }

  const renderReadOnlyDetails = () => {
    return(
      <div className="permissionDetailsText">
        <div>{`The ${props.permission} privelege provides access to the following features:`}</div>
        <ul>
          <li className="listWithBullets">Read privileges on all quizzes, questions and answers</li>
          <li className="listWithBullets">Option to search for a quiz by name or category</li>
          <li className="listWithBullets">Option to browse all quizzes</li>
          <li className="listWithBullets">Option to take a quiz</li>
        </ul>
      </div>
    );
  }

  const renderUserDetails = () => {
    return(
      <div className="permissionDetailsText">
        <div>{`The ${props.permission} privelege provides access to the following features:`}</div>
        <ul>
          <li className="listWithBullets">Option to search for a quiz by name or category</li>
          <li className="listWithBullets">Option to browse all quizzes</li>
          <li className="listWithBullets">Option to take a quiz</li>
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
