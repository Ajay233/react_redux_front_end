import React from 'react'
import { connect } from 'react-redux'
import { timedFunc } from '../utils/display'
import history from '../history'

class QuizIntro extends React.Component {

  componentDidMount(){
    document.documentElement.scrollTop = 0;
  }

  timedRedirect = () => {
    history.push("/startQuiz")
  }

  renderImg = (imgUrl) => {
    return imgUrl ? <div className="quizIntroImgContainer"><img src={imgUrl}  className="quizIntroImg" alt=""/></div> : null
  }

  renderAuthor = (author) => {
    return author !== 'Anonymous' ? <div className="quizIntroAuthor">{`Created by: ${author}`}</div> : null
  }

  render(){
    const { name, description, imgUrl, author } = this.props.quiz
    return(
      <div className="componentContainer">
        {timedFunc(2500, this.timedRedirect)}
        <div className="quizIntroTitle">{name}</div>
        {this.renderImg(imgUrl)}
        <div className="quizIntroDescription">{description}</div>
        {this.renderAuthor(author)}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    quiz: state.quiz
  }
}

export default connect(mapStateToProps)(QuizIntro)
