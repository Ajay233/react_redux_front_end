import React from 'react';
import { connect } from 'react-redux'
import { setUserList } from './actions'

class UserList extends React.Component {

  componentDidMount(){
    const data = {"test": "test"};
    console.log(this.props.userData.jwt);
    this.props.setUserList("users", this.props.userData.jwt);
  }

  renderList = () => {

  }

  render(){
    return(
      <div>
        Test page for rendering a list after GET request using the token
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    listOfUsers: state.listOfUsers
  };
}

export default connect(mapStateToProps, {setUserList})(UserList)
