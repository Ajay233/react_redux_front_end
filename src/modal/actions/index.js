export const showModal = () => {
  return {
    type: "SHOW_MODAL",
    payload: true
  }
}

export const hideModal = () => {
  return {
    type: "HIDE_MODAL",
    payload: false
  }
}
