import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import QuizPdf from '../pdf/quizPdf'
import { asyncGetUsingParams } from '../axiosRequests/requests'
import { useSelector } from 'react-redux'

const DownloadQuizButton = (props) => {

  ///////////////////////////////////////////// NOTE ////////////////////////////////////////////////////////////////////////////
  // This was built to implement a download button that would allow the user to immdeiately download a pdf of the quizPdf
  // which had the title of the quiz as the filename by default.  This wasn't working because the button tries to render the
  // QuizPdf component before the questions and answers had been fetehced from the back end.  Had tried an async request
  // and used await to wait for the response but the component seemd to operate outside of this and didn't wait, causing an error
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const quizData = useSelector(state => state.quizDownloadData)  // experimenting with redux-hook
  console.log(quizData)
  const getAllQuizDetails = async () => {
    const { jwt, quiz } = props
    const param = { id: quiz.id }
    const response = await asyncGetUsingParams('quiz/download', param, jwt)
    return response
  }


  const fileName = props.quiz.name.replace(/\s/g, '_')
  return(
    <React.Fragment>
      <PDFDownloadLink
        document={<QuizPdf quiz={props.quiz} quizDownloadData={getAllQuizDetails()}/>}
        fileName={`${fileName}.pdf`}
        className="linkStandard">
        {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download PDF')}
      </PDFDownloadLink>
    </React.Fragment>
  );
}

export default DownloadQuizButton
