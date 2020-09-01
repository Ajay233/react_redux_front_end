import { globalVaules } from '../factory/global'

export const globalReducer = (state=globalVaules, action) => {
  switch (action.type) {
    case "SET_URL": return {...state, url: action.payload}
    case "SET_THEME": return {...state, enableDarkMode: action.payload}
    default: return state;
  }
}

export const toTopButtonReducer = (state=false, action) => {
  switch (action.type) {
    case "SHOW_TO_TOP_BUTTON": return {...state, showToTopButton: action.payload}
    default: return state;
  }
}
