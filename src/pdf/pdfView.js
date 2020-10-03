import React from 'react'
import { connect } from 'react-redux'
import { PDFViewer } from '@react-pdf/renderer';
import QuizPdf from './quizPdf'

class PDFView extends React.Component {
  render(){
    const { quiz, quizDownloadData } = this.props
    return(
      <PDFViewer className="frame">
        <QuizPdf quiz={quiz} quizDownloadData={quizDownloadData} />
      </PDFViewer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    quizDownloadData: state.quizDownloadData
  }
}

export default connect(mapStateToProps)(PDFView)
