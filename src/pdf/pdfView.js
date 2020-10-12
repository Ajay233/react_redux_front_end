import React from 'react'
import { connect } from 'react-redux'
import { PDFViewer } from '@react-pdf/renderer';
import QuizPdf from './quizPdf'
import { setNotification } from '../notifications/actions'
import history from '../history'

class PDFView extends React.Component {

  componentDidMount(){
    if(!this.props.userData.loggedIn){
      history.push('/login')

      this.props.setNotification("Your session has expired, please log in to continue", "warning", true)
    }
    document.documentElement.scrollTop = 0;
  }

  renderPdfViewer = () => {
    const { quiz, quizDownloadData, userData } = this.props
    if(!userData.loggedIn){
      return null
    } else {
      return(
        <PDFViewer className="frame">
          <QuizPdf quiz={quiz} quizDownloadData={quizDownloadData} />
        </PDFViewer>
      )
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.renderPdfViewer()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    quiz: state.quiz,
    quizDownloadData: state.quizDownloadData
  }
}

export default connect(mapStateToProps, { setNotification })(PDFView)
