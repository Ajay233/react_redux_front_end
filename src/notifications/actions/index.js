export const setNotification = (msg, type, show) => {
  return {
    type: "SET_NOTIFICATION",
    payload: {
      message: msg,
      type: type,
      show: show
    }
  }
}
