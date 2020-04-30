import { userResults } from '../factory/userResultsFactory';

export const setUserResultsReducer = (userResults=[], action) => {
  if (action.type === "SET_USER_RESULTS") {
    return action.payload;
  } else {
    return userResults;
  }
}
