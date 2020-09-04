import React from 'react'
import NavBar from '../navBar/navBar'
import DropdownList from '../dropdown/dropdownList'
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import history from '../history'

const mockStore = configureStore({})

describe("NavBar", () => {
  it("should render with just the options home and menu", () => {
    const store = mockStore({
      userData: { id: 1, loggedIn: true, permission: "ADMIN"},
      navBarState: { showDropDown: false },
      globals: { enableDarkMode: true }
    })

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <NavBar />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render render the drop down whe menu button is clicked", () => {
    const store = mockStore({
      userData: { id: 1, loggedIn: true, permission: "ADMIN"},
      navBarState: { showDropDown: true },
      globals: { enableDarkMode: true }
    })

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <NavBar />
        </Router>
      </Provider>
    )

    // wrapper.find('#menu').simulate('click')
    expect(wrapper.find(DropdownList)).toHaveLength(1)
  })

  it("should add an event listener when menu is clicked", () => {
    const store = mockStore({
      userData: { id: 1, loggedIn: true, permission: "ADMIN"},
      navBarState: { showDropDown: false },
      globals: { enableDarkMode: true }
    })

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <NavBar />
        </Router>
      </Provider>
    )
    document.addEventListener = jest.fn()

    const menu = wrapper.find('#menu')
    menu.simulate('click')
    expect(document.addEventListener).toHaveBeenCalledTimes(1)
  })

  it("should remove the event listener when menu is clicked again", () => {
    const store = mockStore({
      userData: { id: 1, loggedIn: true, permission: "ADMIN"},
      navBarState: { showDropDown: true },
      globals: { enableDarkMode: true }
    })

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <NavBar />
        </Router>
      </Provider>
    )

    document.removeEventListener = jest.fn()

    const menu = wrapper.find('#menu')
    menu.simulate('click')
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
