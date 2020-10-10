import { put } from '../../axiosRequests/requests'
import { setUserData } from '../../authentication/actions'
import { setNotification } from '../../notifications/actions'
import { sessionExpired } from '../../utils/session'

export const updateUser = (data, jwt) => {
  const emailChangeMsg = "Profile information updated - Your email was changed so your access has been restriced until your email is verified"
  const errorMsg = "Error updating your profile data, please check the details you provided and try again";
  const emailTaken = "An account with that email already exists"
  return (dispatch) => {
    return put('users/update', data, jwt).then((response) => {
      if(response.data.jwt === undefined){
        dispatch(setUserData(response.data, jwt))
        dispatch(setNotification("Profile information updated", "success", true))
      } else {
        dispatch(setUserData(response.data.user, response.data.jwt))
        dispatch(setNotification(emailChangeMsg, "success", true))
      }
    }).catch((error) => {
      console.log(error)
      console.log(error.response)
      if(error.response.status === 403){
        sessionExpired(dispatch);
      } else if(error.response.data === emailTaken){
        dispatch(setNotification(emailTaken, "error", true))
      } else {
        dispatch(setNotification(errorMsg, "error", true))
      }
    });
  }
}
