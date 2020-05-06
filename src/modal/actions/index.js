export const showModal = () => {
  return {
    type: "SHOW_MODAL",
    payload: {
      showModal: true,
      showModal2: false,
      showModal3: false
    }
  }
}

export const hideModal = () => {
  return {
    type: "HIDE_MODAL",
    payload: {
      showModal: false,
      showModal2: false,
      showModal3: false
    }
  }
}

export const showModal2 = () => {
  return {
    type: "SHOW_MODAL",
    payload: {
      showModal: false,
      showModal2: true,
      showModal3: false
    }
  }
}

export const showModal3 = () => {
  return {
    type: "SHOW_MODAL",
    payload: {
      showModal: false,
      showModal2: false,
      showModal3: true
    }
  }
}
