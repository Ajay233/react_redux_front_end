import React from 'react'
import { mapStateToProps } from './notifications'


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
    // snapshot test
  })
  it('can hide a notification after 2 seconds', () => {
    // snapshot test ?
  })
});
