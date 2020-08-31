import { globalVaules } from '../factory/global'

export const globalReducer = (state=globalVaules, action) => {
  switch (action.type) {
    case "SHOW_TO_TOP_BUTTON": return {...state, showToTopButton: action.payload}
    default: return state;
  }
}
