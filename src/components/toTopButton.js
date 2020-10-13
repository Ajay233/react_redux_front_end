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
    const { setToTopButton, toTopButtonState } = this.props
    if(window.scrollY > 20 && toTopButtonState === false){
      setToTopButton(true)
    }

    if(window.scrollY < 20 && toTopButtonState === true){
      setToTopButton()
    }
    // window.scrollY > 20 ? setToTopButton(true) : setToTopButton()
  }

  renderToTopButton = () => {
    const { toTopButtonState } = this.props
    if (toTopButtonState) {
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
    toTopButtonState: state.toTopButtonState
  }
}

export default connect(mapStateToProps, { setToTopButton })(ToTopButton)
