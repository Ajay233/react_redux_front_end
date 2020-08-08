export const setNotification = (msg="", type="", show=false, timed=true) => {
  return {
    type: "SET_NOTIFICATION",
    payload: {
      message: msg,
      type: type,
      show: show,
      timed: timed
    }
  }
}
