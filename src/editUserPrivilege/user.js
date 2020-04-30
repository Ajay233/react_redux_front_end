import React from 'react';

const User = (props) => {
  const { forename, surname, email, permission, verified } = props.userResults;
  return(
      <div>
        <div>{`Name: ${forename} ${surname}`}</div>
        <div>{`Email: ${email}`}</div>
        <div>{`Permission: ${permission}`}</div>
        <div>{`Verified: ${verified === "true" ? "Yes" : "No"}`}</div>
      </div>
    );
}

export default User
