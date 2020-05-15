import { sessionExpired } from './session'
import { setNotification } from '../notifications/actions'
import { logOut } from '../authentication/actions'
import configureStore from 'redux-mock-store'
import history from '../history'

const mockStore = configureStore([]);

describe("sessionExpired", () => {
  it("can call the action creators to log out and set a notification as well as redirecting", () => {

    let store;
    store = mockStore({});

    store.dispatch = jest.fn();
    history.push = jest.fn();

    const msg = "Your session has expired, please log in to continue"

    sessionExpired(store.dispatch);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(logOut());
    expect(store.dispatch).toHaveBeenCalledWith(setNotification(msg, "warning", true))
    expect(history.push).toHaveBeenCalledTimes(1);
  })
})
