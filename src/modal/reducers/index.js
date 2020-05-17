import { modalInitialState } from '../factory/modalStateFactory'

export const showModalReducer = (state=modalInitialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL": return action.payload;
    case "HIDE_MODAL": return action.payload;
    default: return state;
  }
}
