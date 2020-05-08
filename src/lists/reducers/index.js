import { lists } from '../factory/listFactory'

export const setListsReducer = (state=lists, action) => {
  switch (action.type) {
    case "SET_CATEGORIES": return {...state, categories: action.payload};
    default: return state;
  }
}
