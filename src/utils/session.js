import history from '../history'
import { setNotification } from '../notifications/actions'
import { logOut } from '../authentication/actions'

export const sessionExpired = (dispatch) => {
  const msg = "Your session has expired, please log in to continue"
  dispatch(logOut())
  history.push("/login")
  dispatch(setNotification(msg, "warning", true));
}
