import { listOfUsers } from '../factory/userListFactory'

export const setUserListReducer = (userList=listOfUsers, action) => {
  switch (action.type) {
    case "SET_USER_LIST": return action.payload;
    case "DELETE_USER_FROM_LIST": return userList.filter(user => user.id !== action.payload);
    case "CLEAR_USER_LIST": return action.payload;
    default: return userList;
  }
}
