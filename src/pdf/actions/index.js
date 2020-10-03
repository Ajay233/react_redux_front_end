import { getUsingParams } from '../../axiosRequests/requests'
import history from '../../history'

export const setQuizDownloadData = (param, jwt) => {
  return (dispatch) => {
    getUsingParams('quiz/download', param, jwt).then((response) => {
      dispatch({
        type: "SET_QUIZ_DOWNLOAD_DATA",
        payload: response.data
      })
      history.push("/viewPdf")
    }).catch((error) => {
      console.log(error.response)
    })
  }
}
