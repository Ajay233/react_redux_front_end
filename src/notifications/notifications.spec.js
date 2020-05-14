import React from 'react'
import { Provider } from 'react-redux'
import Notification from './notifications'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { mapStateToProps } from './notifications'

const mockStore = configureStore([]);

describe('mapStateToProps', () => {
  it('can map state to props', ()=> {
    const notificationTestData = {
      message: "My test notification",
      type: "success",
      show: true
    }
    const appState = {
      userData: {},
      verificationProcess: {},
      redirect: {},
      notificationData: notificationTestData,
      listOfUsers: {},
      form: {}
    }
    const componentState = mapStateToProps(appState);
    expect(componentState.notificationData).toEqual(notificationTestData);
  })
});

describe('Notification component', () => {

  it('can render a notification', () => {

    let store;
    let component;

    store = mockStore({
      notificationData: {
        message: "Test message",
        type: "success",
        show: true,
        timed: true
      }
    });

    component = renderer.create(
      <Provider store={store}>
        <Notification />
      </Provider>
    );

    expect(component).toMatchSnapshot();

  })

  it('can hide a notification message when the show property is set to false', () => {
    let store;
    let component;

    store = mockStore({
      notificationData: {
        message: "",
        type: "",
        show: false,
        timed: true
      }
    });

    component = renderer.create(
      <Provider store={store}>
        <Notification />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  })

});
