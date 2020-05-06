import { listOfUsers } from '../factory/userListFactory'

export const setUserListReducer = (userList=listOfUsers, action) => {
  switch (action.type) {
    case "SET_USER_LIST": return action.payload;
    default: return userList;
  }
}
