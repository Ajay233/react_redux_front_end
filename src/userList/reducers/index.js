import { listOfUsers } from '../factory/userListFactory'

export const setUserListReducer = (userList=listOfUsers, action) => {
  if(action.type === "SET_USER_LIST"){
    return action.payload;
  } else {
    return userList;
  }
}
