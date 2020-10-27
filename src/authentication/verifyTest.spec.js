import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import Verify from './verify'
import { mapStateToProps } from './verify'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'jest-mock-axios'
import history from '../history'
import { setVerficationProcess } from './actions'
import { setNotification } from '../notifications/actions'
import { setLoaderState } from '../components/actions'

// jest.mock('./actions')
// jest.mock('../notifications/actions')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe("mapStateToProps", () => {
  it("should map state to props", () => {
    const appState = {
      userData: { id: 1, jwt: "jwt" },
      verificationProcess: { completionStatus: "test", token: "test", error: {} }
    }
    const componentState = mapStateToProps(appState)
    expect(componentState).toEqual(appState)
  })
})

describe("Verify component", () => {

  afterEach(() => {
    mockAxios.reset()
  })

  // it("should call verified message and the methods within that", () => {
  //
  //   ------ONLY WORKS IF USING COMPONENTWILLMOUNT BUT THIS CAN NO LONGER BE USED-----
  //
  //   const userData = { id: 1, jwt: "jwt" }
  //   const verificationProcess = { completionStatus: "test", token: "test", error: {} }
  //   const notificationData = { message: "", type: "", show: false, timed: true }
  //
  //   const store = mockStore({
  //     userData: { id: 1, jwt: "jwt" },
  //     verificationProcess: { completionStatus: "completed", token: "", error: {} },
  //     notificationData: { message: "", type: "", show: false, timed: true }
  //   })
  //
  //   history.push("/verify?token=test");
  //
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <Verify
  //           userData={userData}
  //           verificationProcess={verificationProcess}
  //           notificationData={notificationData}
  //           setVerficationProcess={setVerficationProcess}
  //           setNotification={setNotification}
  //         />
  //       </Router>
  //     </Provider>
  //   );
  //
  //   // console.log(wrapper.debug())
  //   const successMsg = "Your email has now been verified.  Please log in below to continue."
  //   expect(history.location.pathname).toEqual("/login")
  //   // expect(setNotification).toHaveBeenCalledTimes(1)
  //   // expect(setNotification).toHaveBeenCalledWith(successMsg, "success", true)
  // })

  it("should render the token expired message when error data is set to 'TOKEN_EXPIRED'", () => {

    const userData = { id: 1, jwt: "jwt" }
    const verificationProcess = { completionStatus: "test", token: "test", error: {} }
    const notificationData = { message: "", type: "", show: false, timed: true }

    const store = mockStore({
      userData: { id: 1, jwt: "jwt" },
      verificationProcess: { completionStatus: "test", token: "test", error: { data: "TOKEN_EXPIRED" } },
      notificationData: { message: "", type: "", show: false, timed: true },
      globals: { loaderState: { show: false } }
    })

    history.push("/verify?token=test");

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Verify
            userData={userData}
            verificationProcess={verificationProcess}
            notificationData={notificationData}
            setVerficationProcess={setVerficationProcess}
            setNotification={setNotification}
            setLoaderState={setLoaderState}
          />
        </Router>
      </Provider>
    );

    mockAxios.reset()
    wrapper.find('button').simulate('click')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    // This would need to be changed back after deployment if working locally, so this will need to be reworked.
    // This network request may also need to be moved into an action creator.  If so that will change how this test is set up.
    // expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:8080/auth/resendToken", {'userId': 0, 'token': "test" } )
  })

  it("should render the token expired message when error data is set to 'TOKEN_EXPIRED'", () => {

    const userData = { id: 1, jwt: "jwt" }
    const verificationProcess = { completionStatus: "test", token: "test", error: {} }
    const notificationData = { message: "", type: "", show: false, timed: true }

    const store = mockStore({
      userData: { id: 1, jwt: "jwt" },
      verificationProcess: { completionStatus: "test", token: "test", error: { data: "TOKEN_EXPIRED" } },
      notificationData: { message: "", type: "", show: false, timed: true },
      globals: { loaderState: { show: false } }
    })

    history.push("/verify?token=test");

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Verify
            userData={userData}
            verificationProcess={verificationProcess}
            notificationData={notificationData}
            setVerficationProcess={setVerficationProcess}
            setNotification={setNotification}
            setLoaderState={setLoaderState}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot()
  })

  it("should render the token expired message when error data is set to 'TOKEN_UNMATCHED'", () => {

    const userData = { id: 1, jwt: "jwt" }
    const verificationProcess = { completionStatus: "test", token: "test", error: {} }
    const notificationData = { message: "", type: "", show: false, timed: true }

    const store = mockStore({
      userData: { id: 1, jwt: "jwt" },
      verificationProcess: { completionStatus: "test", token: "test", error: { data: "TOKEN_UNMATCHED" } },
      notificationData: { message: "", type: "", show: false, timed: true },
      globals: { loaderState: { show: false } }
    })

    history.push("/verify?token=test");

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Verify
            userData={userData}
            verificationProcess={verificationProcess}
            notificationData={notificationData}
            setVerficationProcess={setVerficationProcess}
            setNotification={setNotification}
            setLoaderState={setLoaderState}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot()
  })

  it("should render the token expired message when error data is set to 'TOKEN_UNMATCHED'", () => {

    const userData = { id: 1, jwt: "jwt" }
    const verificationProcess = { completionStatus: "test", token: "test", error: {} }
    const notificationData = { message: "", type: "", show: false, timed: true }

    const store = mockStore({
      userData: { id: 1, jwt: "jwt" },
      verificationProcess: { completionStatus: "test", token: "test", error: {} },
      notificationData: { message: "", type: "", show: false, timed: true },
      globals: { loaderState: { show: false } }
    })

    history.push("/verify?token=test");

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Verify
            userData={userData}
            verificationProcess={verificationProcess}
            notificationData={notificationData}
            setVerficationProcess={setVerficationProcess}
            setNotification={setNotification}
            setLoaderState={setLoaderState}
          />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot()
  })
})
