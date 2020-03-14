import React from 'react';
import { connect } from 'react-redux';

import DropdownList from './dropdownList';

class DropDown extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      show: false
    }
  }
  showList = () => {
    let bool = !this.state.show;
    this.setState({ show: bool });
  }

  renderList = () => {
    return this.state.show === true ? <DropdownList /> : null;
  }

  render(){
    const {buttonClassName, name} = this.props;
    return(
      <span>
        <span
          className={buttonClassName ? buttonClassName : null}
          onClick={this.showList}
        >
          <u>{name}</u>
        </span>
        {this.renderList()}
      </span>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
}

export default connect(mapStateToProps)(DropDown)
