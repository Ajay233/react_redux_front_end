import { userResults } from '../factory/userResultsFactory';

export const setUserResultsReducer = (state=userResults, action) => {

  switch (action.type) {
    case "SET_USER_RESULTS": return action.payload;
    default: return state;
  }
}
