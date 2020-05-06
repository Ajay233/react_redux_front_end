import { notification } from '../factory/notificationFactory'

export const setNotificationReducer = (notificationData=notification, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": return action.payload;
    default: return notificationData;
  }
}
