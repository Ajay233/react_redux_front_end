import React from 'react';

const User = (props) => {
  const { forename, surname, email, permission, verified } = props.userResults;
  return(
      <div>
        <div className="spacedContent"><b>Name: </b> {`${forename} ${surname}`}</div>
        <div className="spacedContent"><b>Email: </b> {`${email}`}</div>
        <div className="spacedContent"><b>Permission: </b>{`${permission}`}</div>
        <div className="spacedContent"><b>Verified: </b>{`${verified === "true" ? "Yes" : "No"}`}</div>
      </div>
    );
}

export default User
