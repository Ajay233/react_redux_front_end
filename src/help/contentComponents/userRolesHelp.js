import React from 'react'
import { Link } from 'react-router-dom'

class UserRolesHelp extends React.Component {
  render(){
    return(
      <div className="componentContainer">
        <div className="title-large-spaced">User Roles</div>
        <div className="helpContainer">
          <div className="helpSideBar">
          </div>
          <div className="helpContent">
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="">
                Below is a table detailing what features of the app are accessible for each type of user
              </div>
            </div>
            <div className="helpSectionSpacing">
              <div className="title-medium-left-alt bold"></div>
              <div className="">
                <table>
                  <tbody>
                  <tr>
                    <th>Action</th>
                    <th>User</th>
                    <th>Read-Only</th>
                    <th>Admin</th>
                    <th>Super-User</th>
                  </tr>


                  <tr>
                    <td>Manage account</td>
                    <td><i className="fa fa-check-circle green"></i></td>
                    <td><i className="fa fa-check-circle green"></i></td>
                    <td><i className="fa fa-check-circle green"></i></td>
                    <td><i className="fa fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Browse all quizzes</td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Search for Quizzes</td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Take a quiz</td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Create Quizzes</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>View quizzes</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Edit Quiz details</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Delete Quizzes</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Create questions</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>View questions</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Edit questions</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Delete questions</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Create answers</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>View answers</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Edit answers</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Delete Answers</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>View a list of all users</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  <tr>
                    <td>Edit user privilleges</td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-times-circle red"></i></td>
                    <td><i className="fas fa-check-circle green"></i></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRolesHelp