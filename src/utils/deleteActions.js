import { logOut } from '../authentication/actions'
import { setNotification } from '../notifications/actions'
import { handleErrors } from './errorHandling'
import { del } from '../axiosRequests/requests'
import history from '../history'

export const deleteAccount = (config, jwt, successMsg, errorMsg, dispatch) => {
  del("users/deleteAccount", config, jwt).then((response) => {
    dispatch(logOut());
    history.push('/');
    dispatch(setNotification(successMsg, "success", true));
  }).catch((error) => {
    handleErrors(error.response.status, dispatch, errorMsg)
  });
}
