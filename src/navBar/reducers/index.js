import { navBarState } from '../factory/navBarFactory'

export const navBarReducer = (state=navBarState, action) => {
  switch (action.type) {
    case "SET_DROP_DOWN_STATE": return {...state, showDropDown: action.payload}
    default: return state;
  }
}
