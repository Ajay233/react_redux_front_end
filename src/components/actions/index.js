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

export const enableLightMode = () => {
  return {
    type: "SET_THEME",
    payload: false
  }
}

export const enableDarkMode = () => {
  return {
    type: "SET_THEME",
    payload: true
  }
}

export const setLoaderState = (show=false, message="", label="") => {
  return {
    type: "SET_LOADER_STATE",
    payload: {
      show: show,
      message: message,
      label: label
    }
  }
}
