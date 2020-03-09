import { notification } from '../factory/notificationFactory'

export const setNotificationReducer = (notificationData=notification, action) => {
  if(action.type === "SET_NOTIFICATION"){
    return action.payload;
  } else {
    return notification;
  }
}
