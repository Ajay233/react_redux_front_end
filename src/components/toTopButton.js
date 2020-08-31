import React from 'react'
import { connect } from 'react-redux'
import { toTopFunction } from '../utils/display'
import { setToTopButton } from './actions'


class ToTopButton extends React.Component {

  componentDidMount(){
    window.addEventListener('scroll', this.scrollValueCheck)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollValueCheck)
  }

  scrollValueCheck = () => {
    const { setToTopButton } = this.props
    window.scrollY > 20 ? setToTopButton(true) : setToTopButton()
  }

  renderToTopButton = () => {
    const { showToTopButton } = this.props.globals
    if (showToTopButton) {
      return(
        <React.Fragment>
          <button onClick={() => toTopFunction()} className="toTopButton">
            <i className="far fa-arrow-alt-circle-up"></i> To Top
          </button>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.renderToTopButton()}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    globals: state.globals
  }
}

export default connect(mapStateToProps, { setToTopButton })(ToTopButton)
