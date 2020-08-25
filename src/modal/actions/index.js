export const showModal = (imgPath=null) => {
  return {
    type: "SHOW_MODAL",
    payload: {
      showModal: true,
      showModal2: false,
      showModal3: false,
      imgPath: imgPath
    }
  }
}

export const hideModal = () => {
  return {
    type: "HIDE_MODAL",
    payload: {
      showModal: false,
      showModal2: false,
      showModal3: false,
      imgPath: null
    }
  }
}

export const showModal2 = (imgPath=null) => {
  return {
    type: "SHOW_MODAL",
    payload: {
      showModal: false,
      showModal2: true,
      showModal3: false,
      imgPath: imgPath
    }
  }
}

export const showModal3 = (imgPath=null) => {
  return {
    type: "SHOW_MODAL",
    payload: {
      showModal: false,
      showModal2: false,
      showModal3: true,
      imgPath: imgPath
    }
  }
}
