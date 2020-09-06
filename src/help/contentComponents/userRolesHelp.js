import React from 'react'
import SideBar from './sideBar'
import ToTopButton from '../../components/toTopButton'

class UserRolesHelp extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  render(){
    return(
      <div className="componentContainer-alt">

          <div className="helpSideBar">
            <SideBar />
          </div>
          <div className="helpContent">
            <div className="title-large-spaced">User Roles</div>
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
          <ToTopButton />
      </div>
    );
  }
}

export default UserRolesHelp
