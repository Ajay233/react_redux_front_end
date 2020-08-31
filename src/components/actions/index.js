export const setToTopButton = (show=false) => {
  return {
    type: "SHOW_TO_TOP_BUTTON",
    payload: show
  }
}

export const setUrl = (url="") => {
  return {
    type: "SET_URL",
    payload: url
  }
}
