import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { del } from '../axiosRequests/requests'
import '../stylesheets/dropdown.css'

class DropdownList extends React.Component {

  handleDelete = () => {
    const {id, jwt} = this.props.userData
    console.log(id)
    console.log(jwt)
    const config = {
      data: {
        id: id
      }
    }
    del("users/deleteAccount", config, jwt).then((response) => {
      console.log("Deleted")
      // Need to clear reset redux store to clear all data
    }).catch((error) => {
      console.log(error.config)
    });

  }

  render(){
    return(
      <div className="list">
        <ul>
          <Link to="/editProfile">Edit Profile</Link>
          <li>Change Password</li>
          <li onClick={this.handleDelete}>Delete account</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps)(DropdownList)
