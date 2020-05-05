import { userResults } from '../factory/userResultsFactory';

export const setUserResultsReducer = (state=userResults, action) => {
  if (action.type === "SET_USER_RESULTS") {
    return action.payload;
  } else {
    return state;
  }
}
